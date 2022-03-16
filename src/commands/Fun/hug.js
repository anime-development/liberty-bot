const { MessageEmbed } = require('discord.js')
const ramapi = require('ram-api.js')

module.exports = {
	name: "hug",
	desc: "Hugs someone",
	category: "Fun",
	usage: "hug <@user>",
	async command(client, message, args, extras) {
        const member = message.mentions.members.first();
        if(!member) return message.reply({ content: `Please ping the user you want to hug`, allowedMentions: { repliedUser: false } });
        const url = await ramapi.hug(client.config.apiversion, client.config.apikey).then(data => data.url);

        const embed = new MessageEmbed()
            .setTitle(`Hug`)
            .setDescription(`${message.author} hugs ${member}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
