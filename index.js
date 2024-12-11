const TelegramBot = require("node-telegram-bot-api");

const redis = require("redis");

const fs = require("fs");

const client = redis.createClient({ url: "redis://127.0.0.1:6379" });

client.connect();

const token = "7942722889:AAGJW2XVMCLJzS6Asdnvil0kN-38Pg_pMo4";

const bot = new TelegramBot(token, { polling: true });

const messages = require("./utils/messages");

const components = require("./components/index");
const actions = require("./actions/index");

bot.onText(/\/start/, (msg) => {
  actions.homeMenu(bot, msg.chat.id);
});

bot.on("callback_query", (query) => {
  const myActions = ["google", "microsoft", "farazin"];

  const command = query.data;

  const chatId = query.message.chat.id;

  const messageId = query.message.message_id;

  if (myActions.includes(command))
    actions.sendTranslateKeyBoard(
      bot,
      chatId,
      "action",
      command,
      components[`${command}DestinationLanguage`],
      messages.select_language,
      messageId
    );
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
