import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify secret token
  const { secret } = req.query
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    // Parse Notion webhook payload
    const { page, database } = req.body

    // Revalidate homepage to update post list
    await res.revalidate('/')

    // If it's a page update, revalidate the specific post
    if (page?.id) {
      await res.revalidate(`/posts/${page.id}`)
    }

    // If it's from the blog database, also revalidate homepage
    if (database?.id === process.env.BLOG_DATABASE) {
      await res.revalidate('/')
    }

    return res.json({ revalidated: true, pageId: page?.id, databaseId: database?.id })
  } catch (err) {
    console.error('Error handling Notion webhook:', err)
    return res.status(500).json({ message: 'Error handling webhook' })
  }
}
