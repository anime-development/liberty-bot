const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  GuildID: String,
  Prefix: { type: String, default: "l!" },
});

module.exports = mongoose.model("Guilds", guildSchema);