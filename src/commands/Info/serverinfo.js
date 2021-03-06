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
            {name: "āØ | **Name**", value: `${guild.name}`, inline: true},
            {name: "š | **ID**", value: `${guild.id}`, inline: true},
            {name: "š | **Owner**", value: `${userOwner.tag} (${guild.ownerId})`, inline: true},
            {name: "š | **Created at**", value: `${moment(guild.createdAt).format('DD/MM/YYYY')} at ${moment(guild.createdAt).format('HH:MM')}`, inline: true},
            {name: "š | **Region**", value: `${guild.preferredLocale}`, inline: true},
            {name: "š» | **Members**", value: `${guild.memberCount -1} members`, online: true},
            {name: "š­ | **Roles**", value: `${guild.roles.cache.size} roles`, inline: true},
            {name: "š° | **Channels**", value: `šļø ${guild.channels.cache.filter(ch => ch.type === "text").size} Text Channels\nš¤ ${guild.channels.cache.filter(ch => ch.type === "voice").size} Voice Channels`, inline: true},
            {name: "š  | **Boost Level**", value: `Level ${guild.premiumTier}`, inline: true},
            {name: "š | **Boost**", value: `${guild.premiumSubscriptionCount} Boost(s)`, inline: true},
            {name: "š | **Partner**", value: `${guild.partnered ?  'Yes' : 'No'}`, inline: true}
            );
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        });
    }
};

