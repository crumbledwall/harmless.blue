const YUQUE_API = 'https://www.yuque.com/api/v2/repos'

export const getContents = async (path: string) => {
  const url = `${YUQUE_API}/${path}`

  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.YUQUE_TOKEN
    }
  })
  return res.json()
}
