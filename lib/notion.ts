import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { NotionPage, NotionDatabaseItem } from '@/types/notion'

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
      content: n2m.toMarkdownString(blocks),
    }
  } catch (error) {
    console.error(`Error fetching content for page ${pageId}:`, error)
    throw error
  }
}

const queryDatabase = async (dbId: string, pageSize = 10, startCursor?: string) => {
  try {
    const res = await notion.databases.query({
      database_id: dbId,
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
      results: res.results,
      nextCursor: res.next_cursor,
      hasMore: res.has_more,
    }
  } catch (error) {
    console.error(`Error querying database ${dbId}:`, error)
    throw error
  }
}

interface PaginationResult {
  items: Array<{
    id: string
    title: string | null
    description: string | null
    date: string | null
    tags: string[]
  }>
  nextCursor: string | null
  hasMore: boolean
}

export const getList = async (pageCursor?: string, pageSize = 10): Promise<PaginationResult> => {
  if (!blogDatabase) {
    console.error('BLOG_DATABASE is not configured')
    return { items: [], nextCursor: null, hasMore: false }
  }

  try {
    const { results, nextCursor, hasMore } = await queryDatabase(blogDatabase, pageSize, pageCursor)
    const res = results as unknown as NotionDatabaseItem[]

    const result: Array<{
      id: string
      title: string | null
      description: string | null
      date: string | null
      tags: string[]
    }> = []

    res.forEach((item) => {
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

      result.push({
        id: item.id,
        title,
        description,
        date,
        tags,
      })
    })

    return {
      items: result,
      nextCursor,
      hasMore,
    }
  } catch (error) {
    console.error('Error fetching post list:', error)
    return { items: [], nextCursor: null, hasMore: false }
  }
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
      const res = results as unknown as NotionDatabaseItem[]

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

export const getPost = async (pageId: string): Promise<{ id: string; title: string; content: string; date: string | null; description: string | null } | null> => {
  try {
    const res = await getContents(pageId)

    return {
      id: res.id,
      title: res.title,
      content: res.content,
      date: res.date,
      description: res.description,
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
