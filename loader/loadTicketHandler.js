const Discord = require("discord.js");

module.exports = {
  handleTicketCreation: function (bot) {
    const userQuestionsMap = new Map();

    bot.on('channelCreate', (channel) => {
      if (channel.name.startsWith('ticket')) {
        setTimeout(() => {
          channel.send(`@here **Dear user**, your ticket has been successfully opened. The maximum response time is **24 hours**. Please note that your ticket will be automatically deleted after **3 days**.`);
        }, 5000);
      }
    });

    const questions = [
      {
        keywords: ['hwid', 'reset'],
        response: (user) => `Hello ${user}, if you have requested a reset of your HWID, please send us your email address and we will reset it as soon as possible.`
      },
      {
        keywords: ['buy', 'paypal'],
        response: (user) => `Hello ${user}, If you want to make a purchase using PayPal, please follow the steps on this link: https://www.supportcheats.com/paypal.

After you have completed the payment, please respond here by filling out this form:
\`\`\`
Game: (type here)
e-mail: (type here)
\`\`\``
      },
      {
        keywords: ['receive', 'product'],
        response: (user) => `Hello ${user}, if you haven't received your product/key, please send the email you used when making the payment here.`
      }
    ];

    bot.on('messageCreate', (message) => {
      if (message.channel.name.startsWith('ticket') && !message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        const content = message.content.toLowerCase();
        const channelId = message.channel.id;
        const userQuestions = userQuestionsMap.get(channelId) || new Set();

        for (const question of questions) {
          const hasAllKeywords = question.keywords.every(keyword => content.includes(keyword));

          if (hasAllKeywords && !userQuestions.has(content)) {
            message.channel.send(question.response(message.author));
            userQuestions.add(content);
            userQuestionsMap.set(channelId, userQuestions);
            break;
          }
        }
        console.log(userQuestionsMap)
      }
    });
    bot.on('channelDelete', (channel) => {
        const channelId = channel.id;
        if (userQuestionsMap.has(channelId)) {
          userQuestionsMap.delete(channelId);
        }
      });
  }
};