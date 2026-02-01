# Telegram Chat Translator

This script monitors a specified Telegram chat and automatically translates each incoming text message into simplified Mandarin using the OpenAI API, then posts the translation back to the same chat.

## Setup

1. **Install dependencies**

```bash
npm install node-telegram-bot-api openai dotenv
```

2. **Configure credentials**

Copy the template and fill in your API keys:

```bash
cp .env.template .env
# Edit .env and set TELEGRAM_BOT_TOKEN and OPENAI_API_KEY
```

3. **Run the bot**

```bash
node translator.js
```

The bot will start polling for new messages in the chat ID configured in `.env` (default: -1003843337113).

## Notes

- Make sure the bot account is added to the target Telegram chat with permission to read messages and send messages.
- For best results, restrict the bot to text-only messages.
