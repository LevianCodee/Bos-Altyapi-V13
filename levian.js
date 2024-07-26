const { Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collection } = require('discord.js')
const { token, prefix } = require('./config')
const client = new Client({ intents: 32767 })
const fs = require('fs')

client.files = fs.readdirSync;
client.on('ready', async () => {
    client.user.setPresence({ activities:[{ name: "</> Levian Code" }], status: "idle" })
})
const path = require('path');

client.on('messageCreate', async message => {
    try{
        let client = message.client
        if (message.author.bot) return
        if (message.channel.type == "DM") return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(' ')[0].slice(prefix.length)
        let params = message.content.split(' ').slice(1)
        let cmd
        if (client.commands.has(command)) {
            cmd = client.commands.get(command)
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command))
        }
        if (cmd) {
            cmd.run(client, message, params)
        }
    }catch(e){
        message.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
        ] })
        console.log(e)
    }
})

const log = message => {
    console.log(`${message}`)
}

client.aliases = new Collection()
client.commands = new Collection()
fs.readdir('./commands/', (err, files) => {
    if(!files) return console.log(`Commands klasörü yok!`)
    if (err) console.error(err)
    log(`${files.length} komut yüklenecek.`)
    files.forEach(f => {
        let props = require(`./commands/${f}`)
        log(`Yüklenen komut: ${props.name}.`)
        client.commands.set(props.name, props)
        props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name)
        })
    })
})

client.login(token).then(() => console.log("LC - Giriş başarılı")).catch(e => {
    console.log(e)
    console.log("LC - Giriş başarısız")
    process.exit(1)
})
