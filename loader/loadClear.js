module.exports = async bot => {
    bot.guilds.cache.forEach(async (guild) => {
        const channels = await guild.channels.fetch();
        const time = 1000 * 60 * 60 * 24 * 3; //3days
        console.log(channels)
        channels.forEach(async (channel) => {
            if (channel.name.startsWith('ticket')) {
              if (Date.now() - channel.createdTimestamp > time) {
                  await channel.delete();
                }
            }
            else if (channel.name.startsWith('closed')){
              if(Date.now() - channel.createdTimestamp > time){
                await channel.delete();
              }
            }
        });
      });
}