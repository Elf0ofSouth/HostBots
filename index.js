const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// HTTP server para Railway health check
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running');
});
server.listen(process.env.PORT || 3000, () => {
  console.log(`HTTP server on port ${process.env.PORT || 3000}`);
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.log('DISCORD_TOKEN not set yet, waiting for redeploy...');
} else {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

  client.once('ready', () => console.log(`Bot online: ${client.user.tag}`));

    client.login(token).catch(err => {
    console.error('LOGIN FAILED:', err.message);
    console.error('Full error:', err);
  });

