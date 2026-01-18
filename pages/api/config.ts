import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // In production, save to database
    // For now, just acknowledge
    console.log('New auto-reply message:', message);

    res.status(200).json({ success: true, message: 'Configuration saved' });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
