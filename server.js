import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3000;
const botToken = process.env.BOT_TOKEN;
const managerChatId = process.env.VITE_MANAGER_CHAT_ID;

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
      body: JSON.stringify({ chat_id: targetChatId, text })
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