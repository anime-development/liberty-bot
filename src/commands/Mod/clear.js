const { Permissions } = require('discord.js')

module.exports = {
	name: "clear",
	desc: "Allows you to clear some messages",
	category: "Mod",
	usage: "clear <number between 1 and 99>",
	async command(client, message, args, extras, data) {
        if(!message.guild.me.permissionsIn(message.channel.id).has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ content: `To allows the bot to work correctly, please allow him the \`ADMINISTRATOR\` permission for Mod commands.`, allowedMentions: { repliedUser: false } })
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({ content: `You need the \`MANAGE_MESSAGES\` permission to use this command.`, allowedMentions: { repliedUser: false } })
        const count = args[1]
        if (!/\d+/.test(count)) return message.reply({ content: `Please specify a **number** or messages to delete.`, allowedMentions: { repliedUser: false } })
        if (count < 1 || count > 99) return message.reply({ content: `Please specify a number between 1 and 99.`, allowedMentions: { repliedUser: false } })
        const { size } = await  message.channel.bulkDelete(Number(count) + 1, true)
        const msg = await message.channel.send(`\`${size - 1}\` message(s) deleted!`)
        setTimeout(() => msg.delete(), 5e3)
    },
};


