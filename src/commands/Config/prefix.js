const { Permissions } = require('discord.js')

module.exports = {
	name: "prefix",
	desc: "Changes the bot's prefix for this guild",
	category: "Config",
	usage: "prefix <new prefix>",
	async command(client, message, args, extras, data) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ content: `I'm sorry but you're not allowed to use this command. You must have the \`MANAGE_GUILD\` permission.`, allowedMentions: { repliedUser: false } });
        const newPrefix = args[1]
        if(!newPrefix) return message.reply({ content: `Please tell me the new prefix.`, allowedMentions: { repliedUser: false } });
        if(newPrefix.length > 6 || newPrefix.length < 1) return message.reply({ content: `The new prefix must be 1 character long and cannot have more than 6 characters.`, allowedMentions: { repliedUser: false } });
        if(newPrefix === data.Prefix) return message.reply({ content: `The new prefix cannot be the same as the old one!`, allowedMentions: { repliedUser: false } });
        try {
            await data.updateOne({ Prefix: String(newPrefix) });
            message.reply({ content: `The new prefix have been changed!`, allowedMentions: { repliedUser: false } });
        } catch(err) {
            client.logger.warn(`One command execution failed: ${err}`)
            message.reply({ content: `An error occured while updating the schema.`, allowedMentions: { repliedUser: false } });
        }
    },
};
