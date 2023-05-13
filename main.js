const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799); //Receive all the events (could be reduced)
const bot = new Discord.Client({intents}); 
const loadCommands = require("./loader/loadCommands"); //import command loader
const loadEvents = require("./loader/loadEvents"); //import event loader
const loadClear = require("./loader/loadClear");
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
bot.commands = new Discord.Collection();
bot.login(TOKEN);
loadCommands(bot);
loadEvents(bot);
  setInterval(() => {
    loadClear(bot);
  }, 720000);
  bot.on('channelCreate', (channel) => {
    if (channel.name.startsWith('ticket')) {
      setTimeout(() => {
        channel.send(`@here **Dear user**, your ticket has been successfully opened. The maximum response time is **24 hours**. Please note that your ticket will be automatically deleted after **2 days**.`);
      }, 5000);
    }
  });

  
// bot.on('messageCreate', (message) => {
//   if (message.channel.name.startsWith('ticket') && !message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
//     const content = message.content.toLowerCase();
//     if (content.includes('hwid') && content.includes('reset')) {
//       message.channel.send('Hello, if you asked for an hwid reset please send your email and we will reset it as soon as possible.');
//     }
//   }
// });