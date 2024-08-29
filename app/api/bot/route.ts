export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

bot.on('message:text', async (ctx) => {
  console.log(ctx);
  const message = ctx.message;
  console.log(message);

  if (message.text === '/start') {
    const chatId = message.chat.id;
    const url = 'https://www.mojo.club';

    const response = {
      chat_id: chatId,
      text: 'Welcome! Click the button below to open the mini-app.',
      reply_markup: {
        // keyboard: [
        //   [
        //     {
        //       text: 'Open Mini App',
        //       web_app: {
        //         url: webAppUrl,
        //       },
        //     },
        //   ],
        // ],
        inline_keyboard: [
          [
            {
              text: 'Mojo App',
              web_app: { url },
            },
          ],
        ],
      },
    };

    await ctx.api.sendMessage(chatId, response.text, {
      reply_markup: response.reply_markup,
    });
  } else {
    await ctx.reply('I do not understand you.');
  }

  // await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, 'std/http');
