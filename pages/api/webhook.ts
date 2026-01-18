import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Webhook verification
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  } else if (req.method === 'POST') {
    // Verify signature
    const signature = req.headers['x-hub-signature-256'] as string;
    const appSecret = process.env.INSTAGRAM_APP_SECRET || '';

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', appSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      const signatureHash = signature.split('sha256=')[1];

      if (signatureHash !== expectedSignature) {
        console.error('Invalid signature');
        return res.status(403).send('Forbidden');
      }
    }

    // Process webhook event
    const body = req.body;

    if (body.object === 'instagram') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.field === 'comments') {
            const commentData = change.value;

            // Check if it's a new comment (not a reply from us)
            if (commentData.text && !commentData.from?.username?.includes('bot')) {
              await handleNewComment(commentData);
            }
          }
        }
      }
    }

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

async function handleNewComment(commentData: any) {
  try {
    const commentId = commentData.id;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const autoReplyMessage = process.env.AUTO_REPLY_MESSAGE || 'Thank you for your comment!';

    // Reply to the comment using Instagram Graph API
    const response = await axios.post(
      `https://graph.instagram.com/v18.0/${commentId}/replies`,
      {
        message: autoReplyMessage,
      },
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    console.log('Reply sent successfully:', response.data);
  } catch (error: any) {
    console.error('Error sending reply:', error.response?.data || error.message);
  }
}
