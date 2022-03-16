const { MessageEmbed } = require('discord.js');
const ramapi = require('ram-api.js');

module.exports = {
	name: "goodnight",
	desc: "Says goodnight to everyone!",
	category: "Fun",
	usage: "goodnight",
	async command(client, message, args) {
        let text;
        let url;
        await ramapi.gn(client.config.apiversion, client.config.apikey, client.config.apilang).then(data => {url = data.url; text = data.text});
        const embed = new MessageEmbed()
            .setTitle('Goodnight !!')
            .setDescription(`> ${text}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp()
        message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
    },
};