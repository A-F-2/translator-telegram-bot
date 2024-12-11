const homeInlineKeyboard = {
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

const googleDestinationLanguage = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "en" },
        { text: "فارسی", callback_data: "fa" },
      ],
      // [{ text: "فرازین", callback_data: "/farazin" }],
    ],
  },
};

module.exports = { homeInlineKeyboard, googleDestinationLanguage };
