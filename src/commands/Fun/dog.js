const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: "dog",
	desc: "Gets a random dog from Dog.ceo api",
	category: "Fun",
	usage: "dog",
	async command(client, message, args, extras, data) {
        const dog = await fetch("http://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(json => json.message);

        const embed = new MessageEmbed()
            .setAuthor("Waouf 🐶")
            .setImage(dog)
            .setFooter("Your best doggo (better than your EX)");

        message.channel.send({embeds: [embed]})
    },
};


