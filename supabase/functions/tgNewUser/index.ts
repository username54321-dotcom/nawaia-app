import '@supabase/functions-js/';
import { bot } from './Clients/telegram.ts';
import { app } from './Clients/hono.ts';
import { supabase } from './Clients/supabase.ts';
import { InlineKeyboard } from 'grammy';

app.post('/', async (ctx) => {
  const body = await ctx.req.json();
  // console.log(body);
  const uuid = body.record.user_id;
  const userData = (await supabase.auth.admin.getUserById(uuid)).data.user;
  console.log(userData);

  const tgMessageText = ` 
  ( New User ) !


  User Name : ${userData?.user_metadata.display_name}

  Email : ${userData?.user_metadata.email}

  PhoneNumber: ${userData?.user_metadata.phone}

  Created At : ${userData?.created_at}`;

  const keyboard = new InlineKeyboard()
    .text('Approve', `app,${userData?.id}`)
    .text('Reject', `rej,${userData?.id}`);
  const tgMessage = await bot.api.sendMessage('749475013', tgMessageText, {
    reply_markup: keyboard,
  });
});

Deno.serve({ port: 1111 }, app.fetch);
