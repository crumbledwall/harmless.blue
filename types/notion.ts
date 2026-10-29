/**
 * The subset of a Notion page we read, for both `pages.retrieve` results and
 * blog database rows. Database rows use `Name` as the title; standalone pages use `title`.
 */
export interface NotionPage {
  id: string
  properties: {
    title?: {
      title?: Array<{
        plain_text: string
      }>
    }
    Name?: {
      title?: Array<{
        plain_text: string
      }>
    }
    Tags?: {
      multi_select?: Array<{
        name: string
      }>
    }
    Draft?: {
      select?: {
        name: string | null
      } | null
    }
    Description?: {
      rich_text?: Array<{
        plain_text: string
      }>
    }
    Date?: {
      date?: {
        start: string | null
      } | null
    }
  }
}
