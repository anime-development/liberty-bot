const { Permissions } = require('discord.js')

module.exports = {
	name: "enablelog",
	desc: "Enables the log system",
	category: "Config",
	usage: "enablelog",
	async command(client, message, args, extras) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ content: `I'm sorry but you don't have the required permission to execute this command. You need \`MANAGE_GUILD\` permission.`, allowedMentions: { repliedUser: false } });
        if(!extras.data.logChannel) return message.reply({ content: `The plugin isn't setup correctly. The log channel is missing, please resetup it with \`setlogchannel\` command.`, allowedMentions: { repliedUser: false } });
        if(extras.data.isLogEnabled === true) return message.reply({ content: `The plugin is already enabled!`, allowedMentions: { repliedUser: false } });
        const msg = await message.reply({ content: 'Trying to update the schema...', allowedMentions: { repliedUser: false } });
        try {
            await extras.data.updateOne({ isLogEnabled: true });
            msg.edit({ content: 'The schema has been successfully updated! The plugin is now enabled!', allowedMentions: { repliedUser: false } });
        } catch {
            msg.edit({ content: 'An error occured while enabling the plugin.', allowedMentions: { repliedUser: false } });
        }
        
    },
};
