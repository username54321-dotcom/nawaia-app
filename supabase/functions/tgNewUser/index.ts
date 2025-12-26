import "@supabase/functions-js/";
import { bot } from "./Clients/telegram.ts";
import { app } from "./Clients/hono.ts";
import { supabase } from "./Clients/supabase.ts";
import { InlineKeyboard, webhookCallback } from "grammy";

// New User Webhook
app.post("/", async (ctx) => {
  debugger;
  const body = await ctx.req.json();
  const uuid = body.record.id;
  const userData = (await supabase.auth.admin.getUserById(uuid)).data.user;
  const locationData = userData?.user_metadata.locationData ?? null;

  const tgMessageText = ` 
          ( New User ) 


  User Name : ${userData?.user_metadata.display_name ?? null}

  Email : ${userData?.user_metadata.email ?? null}

  PhoneNumber: ${userData?.user_metadata.phone ?? null}

  Country : ${locationData?.countryName ?? null}

  Region : ${locationData?.regionName ?? null}

  City : ${locationData?.cityName ?? null}

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
    // Set isApproved to TRUE
    const { data: success, error } = await supabase.auth.admin.updateUserById(
      targetUuid,
      { app_metadata: { isApproved: true } },
    );

    // Setting Successful
    if (success) {
      // Formulate new inline keyboard
      newMessageKeyboard[0][0] = {
        text: "Status : Approved",
        callback_data: "status",
      };

      // Update inline keyboard
      ctx.editMessageReplyMarkup({
        reply_markup: { inline_keyboard: newMessageKeyboard },
      });

      // Sign Out The User
      await supabase.auth.admin.signOut(targetUuid);
    }
    return;
  }

  // Rejected
  if (actionType === "rej") {
    // Set isApproved to FALSE
    const { data: success, error } = await supabase.auth.admin.updateUserById(
      targetUuid,
      { app_metadata: { isApproved: false } },
    );

    //Setting Successfull
    if (success) {
      // Formulate new inline keyboard
      newMessageKeyboard[0][0] = {
        text: "Status : Rejected",
        callback_data: "status",
      };

      // Update inline keyboard
      ctx.editMessageReplyMarkup({
        reply_markup: { inline_keyboard: newMessageKeyboard },
      });

      // Sign Out The User
      await supabase.auth.admin.signOut(targetUuid);
    }
  }
});
app.post("/action", webhookCallback(bot, "hono"));

Deno.serve({ port: 1212 }, app.fetch);
