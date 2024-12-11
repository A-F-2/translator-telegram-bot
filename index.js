const TelegramBot = require("node-telegram-bot-api");

const redis = require("redis");

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
  const command = query.data;

  const chatId = query.message.chat.id;

  const messageId = query.message.message_id;

  if (command == "google")
    actions.sendTranslateKeyBoard(
      bot,
      chatId,
      "action",
      command,
      components.googleDestinationLanguage,
      messages.select_language,
      messageId
    );
});
