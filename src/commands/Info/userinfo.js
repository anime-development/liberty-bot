const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
	name: "userinfos",
	desc: "Gets user's info (you or someone!)",
	category: "Info",
	usage: "userinfos [user]",
	async command(client, message, args, extras, data) {
        let member = message.member;
        if (args[1]) member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : null;
        let user = member.user;

        const embed = new MessageEmbed()
            .setTitle(`**${member.user.tag}**`, message.author.avatarURL())
            .setColor('RANDOM')
            .setThumbnail(user.displayAvatarURL())
            .addFields({ name: "📄 **Nickname**", value: `${!member.nickname ? 'No Nickname' : `${member.nickname}`}`, inline: true},
    {name: "🤖 **Bot**", value: `${user.bot ? 'This user is a Bot' : 'This user isn\'t a Bot'}`, inline: true},
    {name: "🆔 **ID**", value: `${member.id}`, inline: true},
    {name: "🕐 **Account created at**", value: `${moment(user.createdAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
    {name: "🕐 **Joined at**", value: `${moment(member.joinedAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
    {name: '\u200b', value: `\u200b`, inline: true},
    {name: "✨ **Boost Server**", value: `${member.premiumSince ? `Since ${member.premiumSinceTimestamp}` : "Didn't boosted server"}`, inline: true},
    {name: "🎭 **Roles**", value: `${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}`, inline: false},
    
    )


        message.reply({ embeds: [embed], allowedMentions:{ repliedUser: false } })
    },
};
