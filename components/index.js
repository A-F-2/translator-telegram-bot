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
    ],
  },
};

const microsoftDestinationLanguage = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "en" },
        { text: "فارسی", callback_data: "fa" },
      ],
    ],
  },
};
const farazinDestinationLanguage = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "انگلیسی", callback_data: "fa_en" },
        { text: "فارسی", callback_data: "en_fa" },
      ],
    ],
  },
};

module.exports = {
  homeInlineKeyboard,
  googleDestinationLanguage,
  microsoftDestinationLanguage,
  farazinDestinationLanguage,
};
