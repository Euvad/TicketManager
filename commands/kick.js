const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Kick a user",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "The member you want to ban",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "Reason of kick",
            required: false
        }
    ],
    async run(bot, message, args) {
        let user = args.getUser("member")
        if (!user) return message.reply("No member were find, impossible to kick.")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("No member to kick.")
        let reason = args.getString("reason")
        if (!reason) reason = "Please fill a reason to proceed.";
        if (message.user.id === user.id) return message.reply("You can't kick yourself.")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Owner cannot be kicked.")
        if (member && !member.kickable) return message.reply("This user cannot be kicked.")
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can't kick this user.")

        try { await user.send(`You have been kicked from ${message.guild.name} by ${message.user.tag} for ${reason}`) } catch (err) { }
        await message.reply(`${message.user} have kicked ${user.tag} for ${reason}`)
        await member.kick(reason)
        return message.reply("No member were find, impossible to kick.")
    }
}