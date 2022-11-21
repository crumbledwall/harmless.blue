import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { pageContent } from '@/types/notion'

const blogDatabase = process.env.BLOG_DATABASE
const notionToken = process.env.NOTION_TOKEN
const aboutPage = process.env.ABOUT_PAGE

const notion = new Client({
  auth: notionToken
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const getContents = async (pageId: string) => {
  const pageData = (await notion.pages.retrieve({ page_id: pageId })) as unknown as pageContent
  const blocks = await n2m.pageToMarkdown(pageId)
  const tags = []
  pageData.properties.Tags?.multi_select.forEach((tag) => {
    tags.push(tag.name)
  })

  return {
    id: pageData.id,
    title: pageData.properties.title
      ? pageData.properties.title?.title[0]?.plain_text
      : pageData.properties.Name?.title[0]?.plain_text,
    description: pageData.properties.Description?.rich_text[0]?.plain_text,
    date: pageData.properties.Date?.date.start,
    tags: tags,
    content: n2m.toMarkdownString(blocks)
  }
}

const queryDatabase = async (dbId: string) => {
  const res = await notion.databases.query({
    database_id: dbId,
    filter: {
      or: []
    },
    sorts: [{
      property: "Date",
      direction: "descending"
    }]
  })

  return res.results
}

export const getList = async () => {
  const res = (await queryDatabase(blogDatabase)) as unknown as pageContent[]
  const result = []

  res.forEach((item) => {
    const page = {
      id: item.id,
      title: item.properties.Name.title[0]?.plain_text,
      description: item.properties.Description.rich_text[0]?.plain_text,
      date: item.properties.Date.date.start,
      tags: []
    }
    item.properties.Tags.multi_select.forEach((tag) => {
      page.tags.push(tag.name)
    })

    result.push(page)
  })

  return result
}

export const getPost = async (pageId: string) => {
  const res = await getContents(pageId)

  return {
    title: res.title,
    content: res.content
  }
}

export const getAbout = async () => {
  const res = await getContents(aboutPage)

  return {
    title: res.title,
    content: res.content
  }
}
