const { MessageEmbed, Discord } = require('discord.js')
const config = require(`../config`)
module.exports = {
    name: "test",
    aliases: [ "test-kısayol" ],
    async run(client, message, args){
        const test = `Test Başarılı!`

        //Yanıt Mesaj
        message.reply(test)


        //Normal Mesaj
        message.channel.send(test)

        //Embed 
        const Embed = new MessageEmbed()
        .setDescription(test)
        .setColor(`BLUE`)
        message.channel.send({ embeds: [Embed] })

        //Yanıt Embed
        const Embed2 = new MessageEmbed()
        .setDescription(test)
        .setColor(`BLUE`)
        message.reply({ embeds: [Embed2] })

}
}