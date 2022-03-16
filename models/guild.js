const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  GuildID: String,
  Prefix: { type: String, default: "l!" },
  isLogEnabled: { type: Boolean, default: false },
  logChannel: String,
  //this property is changed when a user gets banned with ban command by the bot! Used for the unban interaction.
  manualBannedUsers: Array
});

module.exports = mongoose.model("Guilds", guildSchema);