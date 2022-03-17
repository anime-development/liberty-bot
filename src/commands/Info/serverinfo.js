const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
	name: "serverinfo",
	desc: "Gets the server's informations",
	category: "Info",
	usage: "serverinfo",
	async command(client, message, args, extras) {
        const guild = message.guild;
        client.users.fetch(String(guild.ownerId)).then(userOwner => {
            const embed = new MessageEmbed()
            .setTitle(`Server Info`)
            .setColor('RANDOM')
            .setThumbnail(guild.iconURL())
            .addFields(
            {name: "✨ | **Name**", value: `${guild.name}`, inline: true},
            {name: "🆔 | **ID**", value: `${guild.id}`, inline: true},
            {name: "👑 | **Owner**", value: `${userOwner.tag} (${guild.ownerId})`, inline: true},
            {name: "🕛 | **Created at**", value: `${moment(guild.createdAt).format('DD/MM/YYYY')} at ${moment(guild.createdAt).format('HH:MM')}`, inline: true},
            {name: "🌍 | **Region**", value: `${guild.preferredLocale}`, inline: true},
            {name: "🚻 | **Members**", value: `${guild.memberCount -1} members`, online: true},
            {name: "🎭 | **Roles**", value: `${guild.roles.cache.size} roles`, inline: true},
            {name: "📰 | **Channels**", value: `🖊️ ${guild.channels.cache.filter(ch => ch.type === "text").size} Text Channels\n🎤 ${guild.channels.cache.filter(ch => ch.type === "voice").size} Voice Channels`, inline: true},
            {name: "🌠 | **Boost Level**", value: `Level ${guild.premiumTier}`, inline: true},
            {name: "🌟 | **Boost**", value: `${guild.premiumSubscriptionCount} Boost(s)`, inline: true},
            {name: "🌀 | **Partner**", value: `${guild.partnered ?  'Yes' : 'No'}`, inline: true}
            );
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        });
    }
};

