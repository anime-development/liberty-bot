const { run } = require("./ready");

module.exports = {
	name: "msg",
	async run(message, client) {
		
		if (message.author.bot) return;
		const schema = require('../../models/guild')
        const data = await schema.findOne({ GuildID: message.guild.id })
        if(!data) return message.reply({ content: `There is no schemas existing for the guild. Creating one, please wait...`, allowedMentions: { repliedUser: false } }) && new schema({ GuildID: message.guild.id }).save().then(() => message.reply({ content: `The schema has been created. You can now use the commands.`, allowedMentions: { repliedUser: false } }));
		let prefix = data.Prefix;
		if (!message.content.toLowerCase().startsWith(prefix)) return;
		let args = message.content.substring(prefix.length).split(" ");

		const extras = {
			hello: "Hello",
		};

		const cmd = args[0].toLowerCase();
		const command = client.commands.get(String(cmd));
		if (!command) return;
		client.logger.info(`Runned command ${command.name} in ${message.guild.name} by ${message.author.tag}.`)
		command.command(client, message, args, extras, data);
	},
};
