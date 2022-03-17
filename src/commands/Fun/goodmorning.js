const { MessageEmbed } = require('discord.js');
const ramapi = require('ram-api.js');

module.exports = {
	name: "goodmorning",
	desc: "Says goodmorning to everyone!",
	category: "Fun",
	usage: "goodmorning",
	async command(client, message, args, extras, data) {
        let text;
        let url;
        await ramapi.gm(client.config.apiversion, client.config.apikey, client.config.apilang).then(data => {url = data.url; text = data.text});
        const embed = new MessageEmbed()
            .setTitle('Good morning !!')
            .setDescription(`> ${text}`)
            .setImage(url)
            .setColor('RANDOM')
            .setTimestamp()
        message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
    },
};