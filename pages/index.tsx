import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    // Get the current URL for webhook setup
    if (typeof window !== 'undefined') {
      setWebhookUrl(`${window.location.origin}/api/webhook`);
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setStatus('Message saved successfully!');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Error saving message');
      }
    } catch (error) {
      setStatus('Error saving message');
    }
  };

  return (
    <>
      <Head>
        <title>Instagram Auto Reply Bot</title>
        <meta name="description" content="Instagram comment auto-reply automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Instagram Auto Reply Bot 🤖</h1>
          <p style={styles.subtitle}>Automatically reply to Instagram Reels comments</p>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Setup Instructions</h2>
            <ol style={styles.list}>
              <li>Create a Facebook App and Instagram Business Account</li>
              <li>Get your Instagram Access Token from Facebook Developer Portal</li>
              <li>Add environment variables in Vercel:
                <ul style={styles.sublist}>
                  <li><code>INSTAGRAM_ACCESS_TOKEN</code></li>
                  <li><code>INSTAGRAM_VERIFY_TOKEN</code> (any random string)</li>
                  <li><code>INSTAGRAM_APP_SECRET</code></li>
                  <li><code>AUTO_REPLY_MESSAGE</code></li>
                </ul>
              </li>
              <li>Configure webhook in Facebook App Settings:
                <div style={styles.webhookBox}>
                  <strong>Webhook URL:</strong>
                  <input
                    type="text"
                    value={webhookUrl}
                    readOnly
                    style={styles.input}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                </div>
              </li>
              <li>Subscribe to <code>comments</code> field</li>
            </ol>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Current Auto Reply Message</h2>
            <textarea
              style={styles.textarea}
              placeholder="Enter your auto-reply message in Urdu or English..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <button style={styles.button} onClick={handleSave}>
              Save Message
            </button>
            {status && <p style={styles.status}>{status}</p>}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>How It Works</h2>
            <p style={styles.text}>
              Jab bhi koi aapki Instagram Reels par comment karega, yeh bot automatically
              aapka custom message us ko reply kar dega. Aap message ko Urdu ya English
              mein customize kar sakte hain.
            </p>
          </div>

          <div style={styles.footer}>
            <p>Status: <span style={styles.statusBadge}>Active</span></p>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  } as React.CSSProperties,
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  } as React.CSSProperties,
  title: {
    color: 'white',
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '10px',
  } as React.CSSProperties,
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontSize: '1.1rem',
    marginBottom: '30px',
  } as React.CSSProperties,
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#333',
  } as React.CSSProperties,
  list: {
    lineHeight: '1.8',
    color: '#555',
  } as React.CSSProperties,
  sublist: {
    marginTop: '10px',
    lineHeight: '1.6',
  } as React.CSSProperties,
  webhookBox: {
    marginTop: '10px',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '6px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '15px',
  } as React.CSSProperties,
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  } as React.CSSProperties,
  status: {
    marginTop: '10px',
    color: '#667eea',
    fontWeight: 'bold',
  } as React.CSSProperties,
  text: {
    lineHeight: '1.6',
    color: '#555',
  } as React.CSSProperties,
  footer: {
    textAlign: 'center',
    color: 'white',
    marginTop: '30px',
  } as React.CSSProperties,
  statusBadge: {
    background: '#4ade80',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontWeight: 'bold',
  } as React.CSSProperties,
};
