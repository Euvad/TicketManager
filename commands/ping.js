const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "Output bot latency",
  permission: "none",
  dm: true,
  
  async run(bot, message) {
    await message.reply(`Ping: \`${bot.ws.ping}\``);
  }
};