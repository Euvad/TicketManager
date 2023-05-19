const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799); //Receive all the events (could be reduced)
const bot = new Discord.Client({intents}); 
const loadCommands = require("./loader/loadCommands"); //import command loader
const loadEvents = require("./loader/loadEvents"); //import event loader
const loadClear = require("./loader/loadClear");
const loadTicketHandler = require("./loader/loadTicketHandler");
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
bot.commands = new Discord.Collection();
bot.login(TOKEN);
loadCommands(bot);
loadTicketHandler.handleTicketCreation(bot);

loadEvents(bot);
  setInterval(() => {
    loadClear(bot);
  }, 1000 * 60 * 60 * 24 * 3);