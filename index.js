const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// HTTP server para Railway manter o processo vivo
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running');
}).listen(process.env.PORT || 3000, () => {
  console.log('HTTP server on port ' + (process.env.PORT || 3000));
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.log('DISCORD_TOKEN not set, waiting for redeploy...');
} else {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

  client.once('ready', () => {
    console.log('Bot online: ' + client.user.tag);

    // Presença do bot (lida das variáveis de ambiente)
    const presenceType = process.env.PRESENCE_TYPE || 'playing';
    const presenceText = process.env.PRESENCE_TEXT || '';

    if (presenceText) {
      const activityTypes = {
        playing: 0,
        streaming: 1,
        listening: 2,
        watching: 3,
        competing: 5,
      };

      client.user.setPresence({
        activities: [{
          name: presenceText,
          type: activityTypes[presenceType] ?? 0,
        }],
        status: 'online',
      });

      console.log(`Presença definida: ${presenceType} - ${presenceText}`);
    }
  });

  client.login(token).catch(err => {
    console.error('LOGIN FAILED:', err.message);
  });
}
