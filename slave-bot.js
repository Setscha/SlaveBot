const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const serverID = '489472550573703169';
const roleID = '692387593635233832';
const userIDs = ['459360514901016588']

let guild;
let role;

client.once('ready', () => {
    console.log('Ready!');
    guild = client.guilds.cache.find(g => g.id === serverID);
    role = guild.roles.cache.find(role => role.id === roleID);
});

client.login(token);

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'slave') {
        userIDs.forEach(id => {
            const user = guild.members.cache.find(m => m.id === id);
            user.roles.add(role);
        });
        message.channel.send('Coja slave');
	} else if(command === 'noslave') {
        if(userIDs.includes(message.author.id)) return;

        userIDs.forEach(id => {
            const user = guild.members.cache.find(m => m.id === id);
            user.roles.remove(role);
        });
        message.channel.send('Coja no slave :c');
    }
});
