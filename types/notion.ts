export interface PageContent {
  id: string
  properties: {
    title: {
      title: [{
        plain_text: string
      }]
    },
    Name: {
      title: [{
        plain_text: string
      }]
    }
    Tags: {
      multi_select: [
        {
          name: string
        }
      ]
    }
    Draft: {
      select: {
        name: string
      }
    }
    Description: {
      rich_text: [{
        plain_text: string
      }]
    }
    Date: {
      date: {
        start: string
      }
    }
  }
}