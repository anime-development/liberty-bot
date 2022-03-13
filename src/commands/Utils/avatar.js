module.exports = {
	name: "avatar",
	desc: "Gets user's avatar!",
	category: "Utils",
	usage: "avatar [user]",
	async command(client, message, args, extras, data) {
        const optionnalMember = message.mentions.members.first();
        let avatar;
        if(optionnalMember) { avatar = optionnalMember.user.avatarURL({ size: 1024 }); } else { avatar = message.author.avatarURL({ size: 1024 }) };
        message.reply({ content: `Here's the avatar you requested: ${avatar}`, allowedMentions: { repliedUser: false } });
    },
};
