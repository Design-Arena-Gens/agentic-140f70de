# Instagram Auto Reply Bot 🤖

Automatically reply to comments on your Instagram Reels with custom messages.

## Features

- ✅ Automatic replies to all Instagram Reels comments
- ✅ Customizable reply message (Urdu/English support)
- ✅ Secure webhook verification
- ✅ Real-time comment processing
- ✅ Easy deployment to Vercel

## Setup Instructions

### 1. Facebook & Instagram Setup

1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Add Instagram Basic Display and Instagram Graph API products
3. Connect your Instagram Business Account
4. Get your Instagram User ID and Access Token

### 2. Environment Variables

Create a `.env` file with:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_VERIFY_TOKEN=your_custom_verify_token_123
INSTAGRAM_APP_SECRET=your_app_secret
AUTO_REPLY_MESSAGE=Shukriya aapke comment ke liye! Main jald hi reply karunga.
```

### 3. Webhook Configuration

1. Go to your Facebook App → Webhooks
2. Add webhook URL: `https://your-domain.vercel.app/api/webhook`
3. Enter your verify token (same as `INSTAGRAM_VERIFY_TOKEN`)
4. Subscribe to `comments` field
5. Subscribe your Instagram Business Account to the webhook

### 4. Deploy to Vercel

```bash
npm install
vercel --prod
```

Add environment variables in Vercel dashboard.

## How It Works

1. User comments on your Instagram Reels
2. Instagram sends webhook notification to `/api/webhook`
3. Bot verifies the webhook signature
4. Bot automatically replies with your custom message
5. Comment author receives your auto-reply

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to configure your auto-reply message.

## Note

- Aap apna message Urdu ya English mein customize kar sakte hain
- Bot sirf new comments par reply karega
- Apne app ko Production mode mein set karein Facebook Developer Console mein
