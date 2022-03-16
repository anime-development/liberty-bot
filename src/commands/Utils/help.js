const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	desc: "The help page",
	category: "Utils",
	usage: "help [command]",
	async command(client, message, args, extras) {
        if(args[1]) {
            const commandInput = args[1];
            const command = client.commands.get(commandInput.toLowerCase());
            if(!command) return message.reply({ content: `I'm sorry but this command does not exists.`, allowedMentions: { repliedUser: false } });
            const embed = new MessageEmbed()
                .setTitle(`Command ${command.name}`)
                .setDescription(`> ${command.desc}\n\nSyntax: \`${extras.data.Prefix}${command.usage}\`\nCategory: \`${command.category}\``)
                .setColor("RANDOM")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTimestamp();
            message.reply({ content: `Here's your help!`, allowedMentions: { repliedUser: false }, embeds: [embed] });
        } else {
            const utilsCMDS = client.commands.filter(cmd => cmd.category === "Utils");
            const infoCMDS = client.commands.filter(cmd => cmd.category === "Info");
            const funCMDS = client.commands.filter(cmd => cmd.category === "Fun");
            const configCMDS = client.commands.filter(cmd => cmd.category === "Config");
            const modCMDS = client.commands.filter(cmd => cmd.category === "Mod")

            const embed = new MessageEmbed()
                .setTitle("Help")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`To execute a command, do ${extras.data.Prefix}<command>.\nTo get an advanced help of the command, do ${extras.data.Prefix}help [command].`)
                .addField(`⚙️・Config`,`${configCMDS.map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`ℹ️・Info`, `${infoCMDS.map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`🎉・Fun`, `${funCMDS.map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`⛏️・Utils`, `${utilsCMDS.map(command => `\`${command.name}\``).join(', ')}`)
                .addField(`🔨・Mod`, `${modCMDS.map(command => `\`${command.name}\``).join(', ')}`)
                .setColor("RANDOM")
                .setTimestamp();
            message.reply({ content: `At your orders!`, allowedMentions: { repliedUser: false }, embeds: [embed] })
        }
    },
};
