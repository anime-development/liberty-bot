module.exports = {
	name: "hello",
	desc: "Get a simple hello",
	cat: "Fun",
	usage: "hello",
	async command(client, message, args, extras, data) {
		message.reply({
			content: extras.hello,
			allowedMentions: { repliedUser: true },
		});
	},
};
