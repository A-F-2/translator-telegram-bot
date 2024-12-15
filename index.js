const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

// packages
const axios = require("axios");
const redis = require("redis");
const client = redis.createClient({ url: "redis://127.0.0.1:5458" });
client.connect();

// config
const token = "telegram-token";
const api_token = "api-token";
const bot = new TelegramBot(token, { polling: true });

// utils
const components = require("./components");
const actions = require("./actions");
const messages = require("./utils/messages");

// start command
bot.onText(/\/start/, (msg, match) => actions.homeMenu(bot, msg.chat.id));

bot.on("callback_query", (query) => {
  const myActions = ["google", "microsoft", "faraazin"];
  const myLangs = ["fa", "en", "fa_en", "en_fa", "fr", "es", "pr"];

  const command = query.data;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  myActions.includes(command)
    ? actions.sendTranslateKeyboard(
        bot,
        chatId,
        "action",
        command,
        components[`${command}DestinationLanguage`],
        messages.select_language,
        messageId
      )
    : false;
  myLangs.includes(command)
    ? actions.sendLanguage(bot, chatId, command, messages.send_query)
    : false;
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.startsWith("/")) {
    const action = await client.get(`user:${chatId}:action`);
    const lang = await client.get(`user:${chatId}:lang`);

    if (action && lang) {
      // translate text with api
      const response = await axios.get(
        `https://one-api.ir/translate/?token=${api_token}&action=${action}&lang=${lang}&q=` +
          encodeURIComponent(text)
      );
      let translated_text;
      action == "faraazin"
        ? (translated_text = response.data.result.base[0][1])
        : (translated_text = response.data.result);

      // send translated text to user
      bot.sendMessage(chatId, translated_text);

      // remove records in redis
      await client.del(`user:${chatId}:action`);
      await client.del(`user:${chatId}:lang`);
    }
    actions.homeMenu(bot, msg.chat.id);
  }
});

bot.on("polling_error", (error) => {
  fs.appendFileSync("./logs/polling_error_log.txt", `\n${error}`);
});
bot.on("webhook_error", (error) => {
  fs.appendFileSync("./logs/webHook_error_log.txt", `\n${error}`);
});
bot.on("error", (error) => {
  fs.appendFileSync("./logs/general_error_log.txt", `\n${error}`);
});
