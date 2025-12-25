import "@supabase/functions-js/";
import { bot } from "./Clients/telegram.ts";
import { app } from "./Clients/hono.ts";
import { supabase } from "./Clients/supabase.ts";
import { InlineKeyboard, webhookCallback } from "grammy";

// New User Webhook
app.post("/", async (ctx) => {
  const body = await ctx.req.json();
  const uuid = body.record.user_id;
  const userData = (await supabase.auth.admin.getUserById(uuid)).data.user;
  const locationData = userData?.user_metadata.locationData;

  const tgMessageText = ` 
          ( New User ) 


  User Name : ${userData?.user_metadata.display_name ?? null}

  Email : ${userData?.user_metadata.email ?? null}

  PhoneNumber: ${userData?.user_metadata.phone ?? null}

  Country : ${locationData.countryName ?? null}

  Region : ${locationData.regionName ?? null}

  City : ${locationData.cityName ?? null}

  Created At : ${userData?.created_at}`;

  const keyboard = new InlineKeyboard()
    .text("Status : Pending", "status")
    .row()
    .text("Approve", `app,${userData?.id}`)
    .text("Reject", `rej,${userData?.id}`);
  const tgMessage = await bot.api.sendMessage("749475013", tgMessageText, {
    reply_markup: keyboard,
  });
});

// Approve/Reject Endpoint

bot.on("callback_query", async (ctx) => {
  try {
    await ctx.answerCallbackQuery();
  } catch (error) {
    console.log(error);
  }
  const callBackArgs = ctx.callbackQuery.data?.split(",") ?? [];
  const message = ctx.callbackQuery.message;
  const messageKeyboard = message?.reply_markup?.inline_keyboard;
  const newMessageKeyboard = [...messageKeyboard!];

  const actionType = callBackArgs[0];
  const targetUuid = callBackArgs[1];

  // Approve
  if (actionType === "app") {
    const { data: success, error } = await supabase
      .from("profiles")
      .update({ approved: true })
      .eq("user_id", targetUuid)
      .select();
    if (success) {
      newMessageKeyboard[0][0] = {
        text: "Status : Approved",
        callback_data: "status",
      };
      ctx.editMessageReplyMarkup({
        reply_markup: { inline_keyboard: newMessageKeyboard },
      });
    }
  }

  // Rejected
  if (actionType === "rej") {
    const { data: success, error } = await supabase
      .from("profiles")
      .update({ approved: false })
      .eq("user_id", targetUuid)
      .select();
    if (success) {
      newMessageKeyboard[0][0] = {
        text: "Status : Rejected",
        callback_data: "status",
      };
      ctx.editMessageReplyMarkup({
        reply_markup: { inline_keyboard: newMessageKeyboard },
      });
    }
  }
});
app.post("/action", webhookCallback(bot, "hono"));

Deno.serve({ port: 1212 }, app.fetch);
