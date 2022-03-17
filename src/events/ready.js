const { apiurl, apiversion } = require("../../config");
const ramapi = require('ram-api.js')

module.exports = {
	name: "ready",
	async run(version, client) {
		client.logger.info(`Ready! On Version: ${version}`);

		await ramapi.versioncheck(apiversion).then(data => {
			let apiversionResult = data.version;
			let ifSupported = data.supported;
			let ifOutdated = data.outdated;
			let latest = data.latest;
			if(ifOutdated) {
				if(ifSupported) {
					client.logger.error(`RamAPI is oudated and unsupported. Please update to the last version (${latest}).`)
				} else {
					client.logger.warn(`RamAPI is outdated but can still used. The latest version is ${latest} (your version: ${apiversionResult}).`)
				}
			} else {
				client.logger.info(`You're running RamAPI ${apiversionResult}. This is the latest version.`)
			}
		}).catch(err => client.logger.error(`RamAPI error: ${err}`))
	},
};
