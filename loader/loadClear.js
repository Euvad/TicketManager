module.exports = async bot => {
    bot.guilds.cache.forEach(async (guild) => {
        const channels = await guild.channels.fetch();
        const fortyEightHours = 48 * 60 * 60 * 1000;
        console.log(channels)
        channels.forEach(async (channel) => {
            if (channel.name.startsWith('ticket')) {
              if (Date.now() - channel.createdTimestamp > fortyEightHours) {
                  await channel.delete();
                }
            }
            else if (channel.name.startsWith('closed')){
              if(Date.now() - channel.createdTimestamp > fortyEightHours){
                await channel.delete();
              }
            }
        });
      });
}