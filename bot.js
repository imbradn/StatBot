const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { token } = require("./botconfig.json");

const client = new CommandoClient({
    commandPrefix: 'sb!',
    owner: '263789620007927813',
    invite: 'https://discord.gg/z4quqGJ'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['hypixel', 'Hypixel related stat commands.']
    ])
    .registerDefaultGroups({
        utility: false
    })
    .registerDefaultCommands({
        prefix: false,
        ping: false,
        eval: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));
["event"].forEach(x => require(`./handler/${x}`)(client));
client.login(token);