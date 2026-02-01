require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const openaiKey = process.env.OPENAI_API_KEY;
const chatId = parseInt(process.env.CHAT_ID || '-1003843337113', 10);

if (!botToken || !openaiKey) {
  console.error('Please set TELEGRAM_BOT_TOKEN and OPENAI_API_KEY in environment or .env file');
  process.exit(1);
}

const bot = new TelegramBot(botToken, { polling: true });
const openai = new OpenAIApi(new Configuration({ apiKey: openaiKey }));

bot.on('message', async (msg) => {
  if (msg.chat && msg.chat.id === chatId && msg.text) {
    try {
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a translator. Translate text to simplified Mandarin.' },
          { role: 'user', content: msg.text }
        ],
        temperature: 0.3
      });
      const translation = res.data.choices[0].message.content.trim();
      await bot.sendMessage(chatId, translation);
    } catch (err) {
      console.error('Translation error:', err.message || err);
    }
  }
});

console.log(`Translator bot started for chat ${chatId}`);
