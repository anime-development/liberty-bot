const ramapi = require('ram-api.js')
const { apiversion, apikey, apilang } = require("../../../config");

module.exports = {
	name: "8ball",
	desc: "Ask the bot a question",
	category: "Fun",
	usage: "8ball <question>",
	async command(client, message, args, extras, data) {
		if (!args[3])return message.reply({ content: "Please ask a 3 words or more question!", allowedMentions: { repliedUser: false } });
		await ramapi._8ball(apiversion, apikey, apilang).then(data => { message.reply({ content: `The 8ball said: ${data.text}`, allowedMentions: { repliedUser: false } }) }).catch(err => { console.log(err); message.reply({ content: "An error occured.", allowedMentions: { repliedUser: false } }) })
	}
};
