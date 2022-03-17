const { Permissions } = require('discord.js')

module.exports = {
	name: "disablelog",
	desc: "Disables the log system",
	category: "Config",
	usage: "disablelog",
	async command(client, message, args, extras) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ content: `I'm sorry but you don't have the required permission to execute this command. You need \`MANAGE_GUILD\` permission.`, allowedMentions: { repliedUser: false } });
        if(extras.data.isLogEnabled === false) return message.reply({ content: `The plugin is already disabled!`, allowedMentions: { repliedUser: false } });
        const msg = await message.reply({ content: 'Trying to update the schema...', allowedMentions: { repliedUser: false } });
        try {
            await extras.data.updateOne({ isLogEnabled: false });
            msg.edit({ content: 'The schema has been successfully updated! The plugin is now disabled!', allowedMentions: { repliedUser: false } });
        } catch {
            msg.edit({ content: 'An error occured while disabling the plugin.', allowedMentions: { repliedUser: false } });
        }
    },
};
