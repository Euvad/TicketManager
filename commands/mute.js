const Discord = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "mute",
    description: "Mute a user",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "User to mute",
            required: true
        }, {
            type: "string",
            name: "time",
            description: "Mute duration",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "Mute reason",
            required: false
        }

    ],

    async run(bot, message, args) {
        let user = args.getUser("member")
        if (!user) return message.reply("No user to mute.")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("No user to mute.")

        let time = args.getString("time")
        if (!time) return message.reply("Duration is not set.")
        if(isNaN(ms(time))) return message.reply("Value format is incorrect.")
        if (ms(time) > 864000000) return message.reply("Mute duration cannot exceed 28 days.")

        let reason = args.getString("reason")
        if(!reason) return message.reply("Reason is not set.")

        if (message.user.id === user.id) return message.reply("You can't mute yourself.")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't mute the server owner.")
        if (!member.moderatable) return message.reply("You can't mute this user.")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can't mute this user.")
        if(member.isCommunicationDisabled()) return message.reply("This user is already muted.")

        try { await user.send(`You have been muted from ${message.guild.name} by ${message.user.tag} for ${reason} during ${time}`) } catch (err) { }
        await message.reply(`${message.user} have muted ${user.tag} for ${reason} during ${time}`)
        await member.timeout(ms(time), reason)
  }
};