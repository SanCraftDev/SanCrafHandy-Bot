const {Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_BANS,],});
require("minecraft-server-util");
require("http");
const fs = require("fs");
const config = require("./config.json");

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

if(config.port) {require("./modules/status")(config.port);} else {console.log("Error: Kein Port angegeben!"); process.exit();};

if(config.token) {client.login(config.token);} else {console.log("Error: Kein Token angegeben!"); process.exit();};
