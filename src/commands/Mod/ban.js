const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
	name: "ban",
	desc: "Ban someone",
	category: "Mod",
	usage: "ban <@user> [reason]",
	async command(client, message, args, extras) {
        if(!message.guild.me.permissionsIn(message.channel.id).has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ content: `To allows the bot to work correctly, please allow him the \`ADMINISTRATOR\` permission for Mod commands.`, allowedMentions: { repliedUser: false } });
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: `I'm sorry but you need the \`BAN_MEMBERS\` permissions to ban members.`, allowedMentions: { repliedUser: false } });
        const member = message.mentions.members.first();
        if (!member) return message.reply({ content: `Please ping the user to ban.`, allowedMentions: { repliedUser: false } });
        if (member.id === message.guild.ownerId) return message.reply({ content: `You can't ban the server owner!`, allowedMentions: { repliedUser: false } });
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerId) return message.reply({ content: `I'm sorry but this user is superior to me.`, allowedMentions: { repliedUser: false } });
        if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply({ content: `I'm sorry but this user have the same permissions as me, I can't ban him.`, allowedMentions: { repliedUser: false } });
        const reason = args.slice(2).join(' ') || 'Reason not specified';
        await member.ban({reason});
        //defines the ban for the property manualBannedUsers (see the schema for more).
        const objectBan = {
            member: member.id,
            reason: reason,
            mod: message.author.id,
        }
        //pushing it
        await extras.data.manualBannedUsers.push(objectBan)
        //saving it
        await extras.data.updateOne(extras.data)
        message.reply({ content: `${member.user.tag} has been banned for reason: \`${reason}\``, allowedMentions: { repliedUser: false } });
        if(!extras.data.isLogEnabled) return;
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL())
            .setColor("RED")
            .setTimestamp()
            .setTitle(`[BAN]`)
            .addField(`🔍・User`, `${member} - \` ${member} (${member.id}) \``)
            .addField(`❓・Reason`, `\`${reason}\``)
            .addField(`🔨・Mod`, `${message.author} - \` ${message.author.tag} (${message.author.id}) \``);

        const actionRow = new MessageActionRow().addComponents(new MessageButton().setCustomId("unban").setEmoji(`💝`).setLabel("Unban").setStyle("DANGER"));
        const logChannel = await message.guild.channels.fetch(String(extras.data.logChannel));
        //making sure the channel hasn't been deleted or isn't in the guild
        if(!logChannel) return;
        logChannel.send({ embeds: [embed], components: [actionRow] });
    },
};