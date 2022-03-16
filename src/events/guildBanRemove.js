module.exports = {
    name: "guildBanRemove",
    async run(ban, client) {
        const schema = require('../../models/guild');
	    const data = await schema.findOne({ GuildID: ban.guild.id });
	    if(!data) return;
        const savedUserFomDB = data.manualBannedUsers.find(object => object.member === ban.user.id);
        if(!savedUserFomDB) return;
        await data.updateOne({ $pull: { manualBannedUsers: savedUserFomDB } });
    }
}