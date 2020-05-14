const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const snekfetch = require("snekfetch");
var moment = require('moment');
const { hypixeltoken } = require("../../botconfig.json");
var getLevel = require('../../functions/getLevel.js');
var getRank = require('../../functions/getRank.js');

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
            const hypixelGuildAPI = await snekfetch.get(`https://api.hypixel.net/guild?key=${hypixeltoken}&player=` + userID);
            const hypixelFriendAPI = await snekfetch.get(`https://api.hypixel.net/friends?key=${hypixeltoken}&uuid=` + userID);
            const skinAPI = 'https://visage.surgeplay.com/full/208/' + userID;
            const displayname = hypixelAPI.body.player.displayname;
            const rank = hypixelAPI.body.player.newPackageRank;
            const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;
    
            var statEmbed = new MessageEmbed().setColor('#ff58e5');


            // Checks rank and adds it to the title of the embed
            if(plusplusrank === "SUPERSTAR"){
                var statEmbed = statEmbed.setAuthor(`[MVP++] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            }else{
                if(rank === undefined){
                    var statEmbed = statEmbed.setAuthor(displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }else if(rank === "VIP"){
                    var statEmbed = statEmbed.setAuthor(`[VIP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }else if(rank === "VIP_PLUS"){
                    var statEmbed = statEmbed.setAuthor(`[VIP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }else if(rank === "MVP"){
                    var statEmbed = statEmbed.setAuthor(`[MVP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }else if(rank === "MVP_PLUS"){
                    var statEmbed = statEmbed.setAuthor(`[MVP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }

            }
            if(gamemode === "overall"){
                // Sets users skin as the image of the embed.
                var karma = hypixelAPI.body.player.karma;
                var lastLogin = hypixelAPI.body.player.lastLogin;
                var howLongAgo = moment(lastLogin).fromNow();
                var month = moment(lastLogin).get('month') + 1;
                let lastLoginString = "\n(" + moment(lastLogin).get('year') + "/" + month + "/" + moment(lastLogin).get('date') + ")";
                var guildName = hypixelGuildAPI.body.guild.name;
                var guildMembers = hypixelGuildAPI.body.guild.members.length;
                var guildTag = hypixelGuildAPI.body.guild.tag;
                if(guildTag === undefined){var guildTag = ""}else{var guildTag = " [" + hypixelGuildAPI.body.guild.tag + "]";}
                var friendCount = hypixelFriendAPI.body.records.length;

                var statEmbed = statEmbed.setImage(skinAPI)
                .addField('**Level**', getLevel(hypixelAPI.body.player.networkExp), true)
                .addField('**Rank**', getRank(rank, plusplusrank), true)
                .addField('**Karma**', karma, true)
                .addField('**Last Login**', howLongAgo + lastLoginString, true)
                .addField('**Guild**', guildName + guildTag + "\n(" + guildMembers + " members)", true)
                .addField('**Friends**', friendCount, true);
            }
    
            message.say(statEmbed);

        }
	}
};