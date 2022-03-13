const { MessageEmbed } = require('discord.js')
const ramapi = require('ram-api.js')

module.exports = {
	name: "cuddle",
	desc: "Cuddles someone",
	category: "Fun",
	usage: "cuddle <@user>",
	async command(client, message, args, extras, data) {
        const member = message.mentions.members.first();
        if(!member) return message.reply({ content: `Please ping the user you want to cuddle`, allowedMentions: { repliedUser: false } });
        const url = await ramapi.slap(client.config.apiversion, client.config.apikey).then(data => data.url);

        const embed = new MessageEmbed()
            .setTitle(`Cuddle`)
            .setDescription(`${message.author} cuddles ${member}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp();
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};
