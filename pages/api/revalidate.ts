import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify secret token (optional but recommended)
  const { secret } = req.query
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    const { path } = req.body

    if (path) {
      await res.revalidate(path)
      return res.json({ revalidated: true, path })
    }

    // If no path provided, revalidate all pages
    await res.revalidate('/')
    await res.revalidate('/about')
    await res.revalidate('/friends')

    return res.json({ revalidated: true, all: true })
  } catch (err) {
    console.error('Error revalidating:', err)
    return res.status(500).json({ message: 'Error revalidating' })
  }
}
