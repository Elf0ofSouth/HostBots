const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// HTTP server para Railway não matar o processo
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running');
}).listen(process.env.PORT || 3000);

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
});

client.once('ready', () => console.log(`Bot online: ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);
