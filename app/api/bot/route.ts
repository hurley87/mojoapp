export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  const message = ctx.message;

  console.log('Received message:', message);

  if (message.text === '/start') {
    const chat_id = message.chat.id;
    const url = 'https://www.mojo.club';

    const response = {
      chat_id,
      text: 'Welcome! Click the button below to open the Mono Mini-App.',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Mono Mini-App',
              web_app: { url },
            },
          ],
        ],
      },
    };

    await ctx.api.sendMessage(chat_id, response.text, {
      reply_markup: response.reply_markup,
    });
  }
});

export const POST = webhookCallback(bot, 'std/http');
