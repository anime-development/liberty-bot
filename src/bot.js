const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const { version, prefix } = require("../config");
const { token, mongourl } = require("../secure/token");
const mongoose = require("mongoose");
const { createLogger, format, transports, level } = require("winston");
const { consoleFormat } = require("winston-console-format");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.logger = createLogger({
	level: "silly",
	format: format.combine(
		format.timestamp(),
		format.ms(),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "Test" },
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.padLevels(),
				consoleFormat({
					showMeta: true,
					metaStrip: ["timestamp", "service"],
					inspectOptions: {
						depth: Infinity,
						colors: true,
						maxArrayLength: Infinity,
						breakLength: 120,
						compact: Infinity,
					},
				})
			),
		}),
	],
});
client.events = new Collection();
client.commands = new Collection();
client.config = require('../config');

["event", "command"].forEach((hand) => {
	require(`./utils/${hand}`)(client);
});

mongoose
	.connect(mongourl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then(client.logger.info("Mongo Activated.. On Bot!"));

client.on("ready", async () => {
	await client.events.get("ready").run(version, client);
});

client.on("messageCreate", async (message) => {
	await client.events.get("msg").run(message, client);
});

client.login(token);
