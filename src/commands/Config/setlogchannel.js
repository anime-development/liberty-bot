const { Permissions } = require('discord.js')

module.exports = {
	name: "setlogchannel",
	desc: "Sets the log channel",
	category: "Config",
	usage: "setlogchannel <#channel>",
	async command(client, message, args, extras) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply({ content: `I'm sorry but you don't have the required permission to execute this command. You need \`MANAGE_GUILD\` permission.`, allowedMentions: { repliedUser: false } });
        const newSetting = message.mentions.channels.first()
        if(!newSetting) return message.reply({ content: 'Please tell me the new channel.', allowedMentions: { repliedUser: false } });
        const msg = await message.reply({ content: 'Trying to update the schema...', allowedMentions: { repliedUser: false } });
        try {
            await extras.data.updateOne({ logChannel: String(newSetting.id) });
            msg.edit({ content: 'The schema has been successfully updated!', allowedMentions: { repliedUser: false } });
        } catch {
            msg.edit({ content: 'An error occured while updating this setting.', allowedMentions: { repliedUser: false } });
        }
    },
};
