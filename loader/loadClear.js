module.exports = async bot => {
    bot.guilds.cache.forEach(async (guild) => {
        const channels = await guild.channels.fetch();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        console.log(channels)
        channels.forEach(async (channel) => {
            if (channel.name.startsWith('ticket' || 'closed')) {
              if (Date.now() - channel.createdTimestamp > twentyFourHours) {
                  await channel.delete();
                }
            }
        });
      });
}