const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Ban a user",
    permission: Discord.PermissionFlagsBits.BanMembers,
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
            description: "Reason of bannishment",
            required: false
        }
    ],
    async run(bot,message,args){
        try{
            let user =  await bot.users.fetch(args._hoistedOptions[0].value)
            if (!user) return message.reply("No member were find, impossible to ban.")
            let member = message.guild.members.cache.get(user.id)
            let reason = args.get("reason").value;
            if (!reason) reason = "Please fill a reason to proceed.";
            if(message.user.id === user.id) return message.reply("You can't ban yourself.")
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Owner cannot be banned.")
            if (member && !member.bannable) return message.reply("This user cannot be banned.")
            if (member && message.member.roles.highest.comparePostionTo(member.roles.highest) <= 0) return message.reply("You can't ban this user.")
            if ((await message.guild.bans.fetch()).get(user.id)) return message.reply("This member is already banned.")

            try {await user.send(`You have been banned from ${message.guild.name} by ${message.user.tag} for ${reason}`)} catch(err) {}
            await message.reply(`${message.user} have banned ${user.tag} for ${reason}`)
            await message.guild.bans.create(user.id, {reason: reason})
        } catch(err){
            return message.reply("No member were find, impossible to ban.")
        }
    }
}