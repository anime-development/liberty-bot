const { MessageEmbed } = require('discord.js')

module.exports = {
	name: "ping",
	desc: "Send the bot's ping and the Discord API's ping.",
	category: "Info",
	usage: "ping",
	async command(client, message, args, extras) {
        const msg = await message.reply({ content: "Pong !", allowedMentions: { repliedUser: false } });
        const botPing = msg.createdTimestamp - message.createdTimestamp;
        let botPingCommentaire;
        let apiPingCommentaire;
        const embed = new MessageEmbed();
        embed.setTitle('**๐Pong !๐**');
            
            
        if(client.ws.ping < 600) {
            apiPingCommentaire = 'Stable';
            embed.setColor('00ff2a');
        } else if(client.ws.ping >= 600) {
            apiPingCommentaire = 'Bad';
            embed.setColor('ffb200');
        } else if(client.ws.ping >= 1200) {
            apiPingCommentaire = 'Very Bad';
            embed.setColor('ff0000');
        };
            
        if(botPing < 600) {
            botPingCommentaire = 'Stable';
            embed.setColor('00ff2a');
        } else if(botPing >= 600) {
            botPingCommentaire = 'Bad';
            embed.setColor('ffb200');
        } else if(botPing >= 1200) {
            botPingCommentaire = 'Very Bad';
            embed.setColor('ff0000');
        };
            
            
        embed.setDescription(`**API latency:** \`${client.ws.ping}ms \\|\\| ${apiPingCommentaire}\`\n**Client latency:** \`${botPing}ms \\|\\| ${botPingCommentaire}\``);
            
        msg.edit({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
};

