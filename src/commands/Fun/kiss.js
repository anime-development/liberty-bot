const { MessageEmbed } = require('discord.js')
const ramapi = require('ram-api.js')

module.exports = {
	name: "kiss",
	desc: "Kiss someone",
	category: "Fun",
	usage: "kiss <@user>",
	async command(client, message, args, extras, data) {
        const member = message.mentions.members.first();
        if(!member) return message.reply({ content: `Please ping the user you want to kiss`, allowedMentions: { repliedUser: false } });
        const url = await ramapi.kiss(client.config.apiversion, client.config.apikey).then(data => data.url);

        const embed = new MessageEmbed()
            .setTitle(`Kiss`)
            .setDescription(`${message.author} kisses ${member}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
