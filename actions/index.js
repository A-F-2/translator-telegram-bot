const redis = require("redis");

const client = redis.createClient({ url: "redis://127.0.0.1:6379" });

client.connect();

const homeMenu = (bot, chatId) => {
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "گوگل", callback_data: "google" },
          { text: "مایکروسافت", callback_data: "microsoft" },
        ],
        [{ text: "فرازین", callback_data: "farazin" }],
      ],
    },
  };
  bot.sendMessage(
    chatId,
    "به ربات ترجمه خوش آمدید\nموتور ترجمه را اتخاب کنید:",
    inlineKeyboard
  );
};

const sendTranslateKeyBoard = (
  bot,
  chatId,
  field,
  command,
  keyboard,
  textMessage,
  messageId
) => {
  const inline_keyboard = keyboard;

  client.set(`user:${chatId}:${field}`, command);
  bot.editMessageText(textMessage, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: inline_keyboard.reply_markup,
  });
};

const sendLanguage = (bot, chatId, lang, message) => {
  client.set(`user:${chatId}:lang`, lang);

  bot.sendMessage(chatId, message);
};

module.exports = { homeMenu, sendTranslateKeyBoard, sendLanguage };
