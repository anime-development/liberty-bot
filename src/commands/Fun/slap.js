const { MessageEmbed } = require('discord.js')
const ramapi = require('ram-api.js')

module.exports = {
	name: "slap",
	desc: "Slaps someone",
	category: "Fun",
	usage: "slap <@user>",
	async command(client, message, args, extras) {
        const member = message.mentions.members.first();
        if(!member) return message.reply({ content: `Please ping the user you want to slap`, allowedMentions: { repliedUser: false } });
        const url = await ramapi.slap(client.config.apiversion, client.config.apikey).then(data => data.url);

        const embed = new MessageEmbed()
            .setTitle(`Slap`)
            .setDescription(`${message.author} slaps ${member}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
