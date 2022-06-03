const YUQUE_API = 'https://www.yuque.com/api/v2/repos'

export const getPostList = async (slug: string) => {
  const url = `${YUQUE_API}/${slug}/docs`

  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.YUQUE_TOKEN
    }
  })
  return res.json()
}

export const getPostContent = async (slug: string) => {
  const url = `${YUQUE_API}/${slug}`

  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.YUQUE_TOKEN
    }
  })
  return res.json()
}
