import express from 'express';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3000;
const botToken = process.env.BOT_TOKEN;
const managerChatId = process.env.VITE_MANAGER_CHAT_ID;
const disableTls = process.env.DISABLE_TLS === 'true' || process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0';
const httpsAgent = new https.Agent({ rejectUnauthorized: !disableTls });

if (disableTls) {
  console.warn('WARNING: TLS certificate verification is disabled for outgoing requests.');
}

if (!botToken) {
  console.error('BOT_TOKEN is not configured in server environment.');
  process.exit(1);
}
if (!managerChatId) {
  console.error('VITE_MANAGER_CHAT_ID is not configured in server environment.');
  process.exit(1);
}

app.use(express.json());
app.use(express.static('dist'));

app.post('/order', async (req, res) => {
  try {
    const { chat_id, text } = req.body;
    const targetChatId = chat_id || managerChatId;
    if (!targetChatId || !text) {
      return res.status(400).json({ error: 'Invalid payload: chat_id and text are required.' });
    }

    const authToken = botToken.trim().startsWith('Bearer ')
      ? botToken.trim()
      : `Bearer ${botToken.trim()}`;

    const response = await fetch('https://platform-api2.max.ru/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      },
      body: JSON.stringify({ chat_id: targetChatId, text }),
      agent: httpsAgent
    });

    const body = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(body);
    }

    return res.status(200).json(body);
  } catch (error) {
    console.error('Order proxy error:', error);
    return res.status(500).json({ error: 'Order proxy failed', details: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(port, () => {
  console.log(`Order proxy server running on http://localhost:${port}`);
});