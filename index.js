const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) =>
//   ctx.reply(
//     "Welcome to DevX attendance Telegram bot!\nTo check yourself, press on the button below and send you location, please."
//   )
// );
// bot.start((ctx) => console.log(ctx.message));
bot.start(async (ctx) => {
  await ctx.reply(
    `Welcome to DevX attendance Telegram bot, ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "DevXer"
    }!\nTo check yourself, press on the button below and send you location, please.`,
    Markup.keyboard([
      Markup.button.locationRequest("💻I'm in the campus", false),
    ])
      .oneTime()
      .resize()
  );
  await bot.on("location", async (ctx) => {
    if (ctx.update.message.reply_to_message) {
      if (ctx.update.message.date)
        await console.log(
          `Latitude is ${ctx.update.message.location.latitude}\nLongitude is ${ctx.update.message.location.longitude}`
        );
      await console.log(
        `Username is ${ctx.update.message.from.username}\nID is ${ctx.update.message.from.id}`
      );
      await console.log(toDateTime(ctx.update.message.date));
    } else {
      ctx.replyWithHTML("<b>Please, press the button below</b>");
    }
  });
});
bot.help((ctx) =>
  ctx.reply(
    "If you have any problem, write directly to @georgymukha or and other ambassador."
  )
);
// bot.command("location", async (ctx) => {
//   await ctx.reply(
//     "Special buttons keyboard",
//     Markup.keyboard([Markup.button.locationRequest("Send location")])
//   );
//   await bot.on("location", (ctx) => {
//     // console.log(
//     //   ctx.update.message.location.latitude,
//     //   ctx.update.message.location.longitude
//     // );
//     console.log(ctx);
//     if (ctx.update.message.reply_to_message) {
//       console.log(111);
//     } else {
//       ctx.replyWithHTML("<b>Please, press the button below</b>");
//     }
//   });
// });
bot.on("edited_message", (ctx) => {
  console.log(ctx.editedMessage.location);
});

bot.hears("💻I'm in the campus", (ctx) => ctx.reply("Yay!"));
bot.command("checkin", (ctx) => {
  ctx.replyWithHTML("<b>You were checked in</b>");
});

bot.launch();

// date - seconds to real date
function toDateTime(secs) {
  var t = new Date(1970, 0, 1, 6); // Epoch
  t.setSeconds(secs);
  date = `${t.getUTCDate()}/${t.getUTCMonth()}/${t.getUTCFullYear()}`; // DD/MM/YYYY
  time = `${t.getUTCHours()}:${t.getUTCMinutes()}`; // HH:MM
  return `${date}\n${time}`;
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
