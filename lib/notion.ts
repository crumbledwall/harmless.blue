import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { NotionPage } from '@/types/notion'

// Environment variables with validation
const blogDatabase = process.env.BLOG_DATABASE
const notionToken = process.env.NOTION_TOKEN
const aboutPage = process.env.ABOUT_PAGE

if (!notionToken) {
  console.error('Missing required environment variable: NOTION_TOKEN')
}
if (!blogDatabase) {
  console.error('Missing required environment variable: BLOG_DATABASE')
}

const notion = new Client({
  auth: notionToken,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const filterUrl = (url: string, id: string) => {
  try {
    const originalUrl = new URL(url)
    const result = new URL(
      `https://www.notion.so/image/${encodeURIComponent(
        `https://${originalUrl.host}${originalUrl.pathname}`
      )}`
    )
    result.searchParams.set('table', 'block')
    result.searchParams.set('id', id)
    result.searchParams.set('cache', 'v2')
    return result.toString()
  } catch (error) {
    console.error(`Invalid image URL: ${url}`, error)
    return url
  }
}

n2m.setCustomTransformer('image', async (block) => {
  const image = block as Record<string, unknown>
  const caption = image.caption ? (image.caption as string[])[0] : ''

  const imageBlock = image.image as Record<string, unknown>
  const file = imageBlock?.file as Record<string, unknown> | undefined
  const external = imageBlock?.external as Record<string, unknown> | undefined
  const url = (file?.url as string) || (external?.url as string)

  if (!url) {
    return ''
  }

  return `![${caption}](${filterUrl(url, image.id as string)})`
})

// notion-to-md v3 emits `$$…$$` for block equations, which needs a math renderer this site does
// not ship. Keep showing the LaTeX source in a code block, as before the upgrade.
n2m.setCustomTransformer('equation', async (block) => {
  const expression = (block as { equation?: { expression?: string } }).equation?.expression
  return expression ? `\`\`\`latex\n${expression}\n\`\`\`` : ''
})

interface PostContent {
  id: string
  title: string
  description: string | null
  date: string | null
  tags: string[]
  content: string
}

const getContents = async (pageId: string): Promise<PostContent> => {
  try {
    const pageData = (await notion.pages.retrieve({ page_id: pageId })) as unknown as NotionPage
    const blocks = await n2m.pageToMarkdown(pageId)
    const tags: string[] = []

    if (pageData.properties.Tags && 'multi_select' in pageData.properties.Tags && pageData.properties.Tags.multi_select) {
      pageData.properties.Tags.multi_select.forEach((tag) => {
        tags.push(tag.name)
      })
    }

    const titleProperty = pageData.properties.title || pageData.properties.Name
    const title = titleProperty && 'title' in titleProperty && titleProperty.title && titleProperty.title.length > 0
      ? titleProperty.title[0].plain_text
      : 'Untitled'

    const description = pageData.properties.Description && 'rich_text' in pageData.properties.Description && pageData.properties.Description.rich_text && pageData.properties.Description.rich_text.length > 0
      ? pageData.properties.Description.rich_text[0].plain_text
      : null

    const date = pageData.properties.Date && 'date' in pageData.properties.Date && pageData.properties.Date.date
      ? pageData.properties.Date.date.start
      : null

    return {
      id: pageData.id,
      title,
      description,
      date,
      tags,
      // notion-to-md v3 returns one string per page; `parent` is the page itself.
      content: n2m.toMarkdownString(blocks).parent ?? '',
    }
  } catch (error) {
    console.error(`Error fetching content for page ${pageId}:`, error)
    throw error
  }
}

// Since Notion API 2025-09-03 (SDK v5), rows are queried from a database's data source, not the
// database. BLOG_DATABASE stays a database ID; its data source ID is looked up once per server
// instance. The blog database has a single data source, so the first one is used.
let blogDataSourceId: Promise<string> | undefined

const getDataSourceId = (databaseId: string): Promise<string> => {
  if (!blogDataSourceId) {
    blogDataSourceId = notion.databases
      .retrieve({ database_id: databaseId })
      .then((database) => {
        const dataSource = 'data_sources' in database ? database.data_sources[0] : undefined
        if (!dataSource) {
          throw new Error(`Database ${databaseId} has no data source this integration can read`)
        }
        return dataSource.id
      })
      .catch((error: unknown) => {
        blogDataSourceId = undefined // look it up again on the next request
        throw error
      })
  }
  return blogDataSourceId
}

const queryDatabase = async (dbId: string, pageSize = 10, startCursor?: string) => {
  try {
    const res = await notion.dataSources.query({
      data_source_id: await getDataSourceId(dbId),
      page_size: pageSize,
      start_cursor: startCursor,
      filter: {
        property: 'Draft',
        select: {
          does_not_equal: 'True',
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    })

    return {
      // A data source query can also return nested data sources (wiki databases); posts are pages.
      results: res.results.filter((result) => result.object === 'page'),
      nextCursor: res.next_cursor,
      hasMore: res.has_more,
    }
  } catch (error) {
    console.error(`Error querying database ${dbId}:`, error)
    throw error
  }
}

export const PAGE_SIZE = 10

export type PostListItem = {
  id: string
  title: string | null
  description: string | null
  date: string | null
  tags: string[]
}

const parseNotionItem = (item: NotionPage): PostListItem => {
  const nameProp = item.properties.Name
  const title = nameProp && 'title' in nameProp && nameProp.title && nameProp.title.length > 0
    ? nameProp.title[0].plain_text
    : null

  const descProp = item.properties.Description
  const description = descProp && 'rich_text' in descProp && descProp.rich_text && descProp.rich_text.length > 0
    ? descProp.rich_text[0].plain_text
    : null

  const dateProp = item.properties.Date
  const date = dateProp && 'date' in dateProp && dateProp.date
    ? dateProp.date.start
    : null

  const tagsProp = item.properties.Tags
  const tags: string[] = []
  if (tagsProp && 'multi_select' in tagsProp && tagsProp.multi_select) {
    tagsProp.multi_select.forEach((tag) => {
      tags.push(tag.name)
    })
  }

  return { id: item.id, title, description, date, tags }
}

/**
 * 获取所有文章（不分页），用于 sitemap 等场景
 */
export const getAllPosts = async (): Promise<Array<{ id: string }>> => {
  if (!blogDatabase) {
    console.error('BLOG_DATABASE is not configured')
    return []
  }

  const allItems: Array<{ id: string }> = []
  let cursor: string | undefined = undefined

  try {
    while (true) {
      const { results, nextCursor, hasMore }: { results: unknown[]; nextCursor: string | null; hasMore: boolean } = await queryDatabase(blogDatabase, 100, cursor)
      const res = results as unknown as NotionPage[]

      res.forEach((item) => {
        allItems.push({ id: item.id })
      })

      if (!hasMore || !nextCursor) {
        break
      }
      cursor = nextCursor
    }

    return allItems
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

/**
 * 获取所有文章（含元数据，不分页），用于首页 ISR 分页
 */
export const getAllPostsList = async (): Promise<PostListItem[]> => {
  if (!blogDatabase) {
    console.error('BLOG_DATABASE is not configured')
    return []
  }

  const allItems: PostListItem[] = []
  let cursor: string | undefined = undefined

  try {
    while (true) {
      const { results, nextCursor, hasMore }: { results: unknown[]; nextCursor: string | null; hasMore: boolean } = await queryDatabase(blogDatabase, 100, cursor)
      const items = (results as unknown as NotionPage[]).map(parseNotionItem)
      allItems.push(...items)

      if (!hasMore || !nextCursor) {
        break
      }
      cursor = nextCursor
    }

    return allItems
  } catch (error) {
    console.error('Error fetching all posts list:', error)
    return []
  }
}

export const getPost = async (pageId: string): Promise<{ id: string; title: string; content: string; date: string | null; description: string | null; tags: string[] } | null> => {
  try {
    const res = await getContents(pageId)

    return {
      id: res.id,
      title: res.title,
      content: res.content,
      date: res.date,
      description: res.description,
      tags: res.tags,
    }
  } catch (error) {
    console.error(`Error fetching post ${pageId}:`, error)
    return null
  }
}

export const getAbout = async (): Promise<{ title: string; content: string }> => {
  if (!aboutPage) {
    console.error('ABOUT_PAGE is not configured')
    return { title: 'About', content: '' }
  }

  try {
    const res = await getContents(aboutPage)

    return {
      title: res.title,
      content: res.content,
    }
  } catch (error) {
    console.error('Error fetching about page:', error)
    return { title: 'About', content: '' }
  }
}
