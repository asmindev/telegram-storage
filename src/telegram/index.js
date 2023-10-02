const core = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();
const bot = new core(process.env.TELEGRAM_TOKEN, { polling: true });
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    const name = msg.from.first_name;

    if (message === "/start") {
        bot.sendMessage(chatId, `Hello ${name}, welcome to the Telegram Bot`);
    } else if (message === "/help") {
        bot.sendMessage(chatId, `Hello ${name}, welcome to the Telegram Bot`);
    } else {
        bot.sendMessage(chatId, `Hello ${name}, welcome to the Telegram Bot`);
    }
});

module.exports = bot;
