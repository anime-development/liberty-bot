const { Permissions } = require('discord.js')

module.exports = {
	name: "ban",
	desc: "Ban someone",
	category: "Mod",
	usage: "ban <@user> [reason]",
	async command(client, message, args, extras, data) {
        if(!message.guild.me.permissionsIn(message.channel.id).has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ content: `To allows the bot to work correctly, please allow him the \`ADMINISTRATOR\` permission for Mod commands.`, allowedMentions: { repliedUser: false } })
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: `I'm sorry but you need the \`BAN_MEMBERS\` permissions to ban members.`, allowedMentions: { repliedUser: false } })
        const member = message.mentions.members.first()
        if (!member) return message.reply({ content: `Please ping the user to ban.`, allowedMentions: { repliedUser: false } })
        if (member.id === message.guild.ownerId) return message.reply({ content: `You can't ban the server owner!`, allowedMentions: { repliedUser: false } })
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerId) return message.reply({ content: `I'm sorry but this user is superior to me.`, allowedMentions: { repliedUser: false } })
        if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: `I'm sorry but this user have the same permissions as me, I can't ban him.`, allowedMentions: { repliedUser: false } })
        const reason = args.slice(2).join(' ') || 'Reason not specified'
        await member.ban({reason})
        message.reply({ content: `${member.user.tag} has been banned for reason: \`${reason}\``, allowedMentions: { repliedUser: false } })
    },
};