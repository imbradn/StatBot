const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')
const snekfetch = require("snekfetch");
const { hypixeltoken } = require("../../botconfig.json");

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'hypixel',
			memberName: 'stats',
            description: 'Displays stats of a specified user.',
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to stat check?',
                    type: 'string'
                },
                {
                    key: 'game',
                    prompt: 'What gamemode would you like to check?',
                    type: 'string',
                    default: 'overall'
                }
            ]
		});
	}

	async run(message, { user, game }) {
        let username = user.toLowerCase();
        let gamemode = game.toLowerCase();

        const mojangAPI = await snekfetch.get('https://api.mojang.com/users/profiles/minecraft/' + username);
        const hypixelAPI = await snekfetch.get(`https://api.hypixel.net/player?key=${hypixeltoken}&name=` + username);

        if(hypixelAPI.body.player === null) {
            const noExist = new MessageEmbed()
                .setDescription(`The user **` + user + `** does not exist!`);
            
            message.say(noExist);

        } else {
            const userID = mojangAPI.body.id;
            const skinAPI = 'https://crafatar.com/renders/body/' + userID + '?overlay';
            const displayname = hypixelAPI.body.player.displayname;
            const rank = hypixelAPI.body.player.newPackageRank;
            const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;
    
            var statEmbed = new MessageEmbed();

            if(plusplusrank === "SUPERSTAR"){
                var statEmbed = statEmbed.setTitle(`[MVP++] ` + displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);

            }else{
                if(rank === undefined){
                    var statEmbed = statEmbed.setTitle(displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);
                }else if(rank === "VIP"){
                    var statEmbed = statEmbed.setTitle(`[VIP] ` + displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);

                }else if(rank === "VIP_PLUS"){
                    var statEmbed = statEmbed.setTitle(`[VIP+] ` + displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);
                    
                }else if(rank === "MVP"){
                    var statEmbed = statEmbed.setTitle(`[MVP] ` + displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);
                    
                }else if(rank === "MVP_PLUS"){
                    var statEmbed = statEmbed.setTitle(`[MVP+] ` + displayname).setURL('https://plancke.io/hypixel/player/stats/' + username);
                    
                }

            }
            var statEmbed = statEmbed.setImage(skinAPI);
    
            message.say(statEmbed);
            message.say(rank);

        }
	}
};