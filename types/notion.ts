export interface PageContent {
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
        name: string
      }
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

export interface NotionDatabaseItem {
  id: string
  properties: {
    Name: {
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
