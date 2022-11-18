const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) =>
//   ctx.reply(
//     "Welcome to DevX attendance Telegram bot!\nTo check yourself, press on the button below and send you location, please."
//   )
// );
// bot.start((ctx) => console.log(ctx.message));
bot.start((ctx) =>
  ctx.reply(
    `Welcome to DevX attendance Telegram bot, ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "devxer"
    }!\nTo check yourself, press on the button below and send you location, please.`,
    Markup.inlineKeyboard([
      Markup.button.callback("💻I'm in the campus", "btn_checkin"),
    ])
      .oneTime()
      .resize()
  )
);
bot.help((ctx) =>
  ctx.reply(
    "If you have any problem, write directly to @georgymukha or and other ambassador."
  )
);
bot.on("edited_message", (ctx) => {
  console.log(ctx.editedMessage.location);
});

bot.hears("💻I'm in the campus", (ctx) => ctx.reply("Yay!"));
bot.command("checkin", (ctx) => {
  ctx.replyWithHTML("<b>You were checked in</b>");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
