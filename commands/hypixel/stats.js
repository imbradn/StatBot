const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const snekfetch = require("snekfetch");
const { hypixeltoken } = require("../../botconfig.json");
var getNetworkLevel = require('../../functions/stats/network/getNetworkLevel.js');
var getBedwarsLevel = require('../../functions/stats/bedwars/getBedwarsLevel.js');
var getRank = require('../../functions/stats/network/getRank.js');

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
        const userID = mojangAPI.body.id;

        if(hypixelAPI.body.player === null) {
            const noExist = new MessageEmbed()
                .setDescription(`The user **` + user + `** does not exist!`);
            
            message.say(noExist);

        } else {
            const hypixelGuildAPI = await snekfetch.get(`https://api.hypixel.net/guild?key=${hypixeltoken}&player=` + userID);
            const hypixelFriendAPI = await snekfetch.get(`https://api.hypixel.net/friends?key=${hypixeltoken}&uuid=` + userID);
            const skinAPI = 'https://visage.surgeplay.com/full/208/' + userID;
            const displayname = hypixelAPI.body.player.displayname;
            const rank = hypixelAPI.body.player.newPackageRank;
            const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;
    
            var statEmbed = new MessageEmbed().setColor('#ff58e5');


            // // Checks rank and adds it to the title of the embed
            // if(plusplusrank === "SUPERSTAR"){
            //     var statEmbed = statEmbed.setAuthor(`[MVP++] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + displayname);
            // }else{
            //     if(rank === undefined){
            //         var statEmbed = statEmbed.setAuthor(displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            //     }else if(rank === "VIP"){
            //         var statEmbed = statEmbed.setAuthor(`[VIP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            //     }else if(rank === "VIP_PLUS"){
            //         var statEmbed = statEmbed.setAuthor(`[VIP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            //     }else if(rank === "MVP"){
            //         var statEmbed = statEmbed.setAuthor(`[MVP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            //     }else if(rank === "MVP_PLUS"){
            //         var statEmbed = statEmbed.setAuthor(`[MVP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
            //     }

            // }
            var embedTitle = require('../../functions/embed/embedTitle.js');
            var statEmbed = embedTitle(statEmbed, username, userID, hypixelAPI);
            if(gamemode === "overall"){
                var getOverallEmbed = require('../../functions/stats/network/overall.js');
                var statEmbed = getOverallEmbed(statEmbed, hypixelAPI, hypixelFriendAPI, hypixelGuildAPI, skinAPI, username, userID);
                // // Sets users skin as the image of the embed.
                // var karma = hypixelAPI.body.player.karma;
                // var lastLogin = hypixelAPI.body.player.lastLogin;
                // var howLongAgo = moment(lastLogin).fromNow();
                // var month = moment(lastLogin).get('month') + 1;
                // let lastLoginString = "\n(" + moment(lastLogin).get('year') + "/" + month + "/" + moment(lastLogin).get('date') + ")";
                // if(hypixelGuildAPI.body.guild === null){
                //     var guildName = "None"
                //     var guildMembers = "0";
                //     var guildTag = "";
                // }else{
                //     var guildName = hypixelGuildAPI.body.guild.name;
                //     var guildMembers = hypixelGuildAPI.body.guild.members.length;
                //     var guildTag = hypixelGuildAPI.body.guild.tag;
                //     if(guildTag === undefined){var guildTag = ""}else{var guildTag = " [" + hypixelGuildAPI.body.guild.tag + "]";}
                // }
                // var friendCount = hypixelFriendAPI.body.records.length;

                // var statEmbed = statEmbed.setImage(skinAPI)
                // .addField('**Level**', getNetworkLevel(hypixelAPI.body.player.networkExp), true)
                // .addField('**Rank**', getRank(rank, plusplusrank), true)
                // .addField('**Karma**', karma, true)
                // .addField('**Last Login**', howLongAgo + lastLoginString, true)
                // .addField('**Guild**', guildName + guildTag + "\n(" + guildMembers + " members)", true)
                // .addField('**Friends**', friendCount, true)
                // .setFooter(`made with 💕 by Bradn 🍣`)
                // .setTimestamp();
            }else if(gamemode === "tntgames" || gamemode === "tnt"){
                var getTntEmbed = require('../../functions/stats/tntgames/tntgames.js');
                var statEmbed = getTntEmbed(statEmbed, hypixelAPI, username, userID);
            }else if(gamemode === "bedwars" || gamemode === "bw"){


                var bwcoins = hypixelAPI.body.player.stats.Bedwars.coins;
                if(bwcoins === undefined){var bwcoins = 0;}
                var bwboxes = hypixelAPI.body.player.stats.Bedwars.bedwars_boxes;
                if(bwboxes === undefined){var bwboxes = 0;}
                var bwexp = hypixelAPI.body.player.stats.Bedwars.Experience;
                if(bwexp === undefined){var bwexp = 0;}

                var bwfinalkills = hypixelAPI.body.player.stats.Bedwars.final_kills_bedwars;
                if(bwfinalkills === undefined){var bwfinalkills = 0;}
                var bwfinaldeaths = hypixelAPI.body.player.stats.Bedwars.final_deaths_bedwars;
                if(bwfinaldeaths === undefined){var bwfinaldeaths = 0;}
                var bwfkdr = bwfinalkills/bwfinaldeaths;

                var bwwins = hypixelAPI.body.player.stats.Bedwars.wins_bedwars;
                if(bwwins === undefined){var bwwins = 0;}
                var bwlosses = hypixelAPI.body.player.stats.Bedwars.losses_bedwars;
                if(bwlosses === undefined){var bwlosses = 0;}
                var bwwlr = bwwins/bwlosses;

                var statEmbed = statEmbed
                .setDescription(`Bedwars **-** Overall`)
                .addField(`**Coins**`, bwcoins, true)
                .addField(`**Level**`, getBedwarsLevel(bwexp), true)
                .addField(`**Loot Boxes**`, bwboxes, true)
                .addField(`**Final Kills**`, bwfinalkills, true)
                .addField(`**Final Deaths**`, bwfinaldeaths, true)
                .addField(`**Final KDR**`, bwfkdr.toFixed(2), true)
                .addField(`**Wins**`, bwwins, true)
                .addField(`**Losses**`, bwlosses, true)
                .addField(`**WLR**`, bwwlr.toFixed(2), true);

            }else{
                var statEmbed = statEmbed.addField(`**ERROR**`, `This gamemode does not exist, if you believe this is a mistake please contact bradn#6668`, false)

            }
    
            message.say(statEmbed);

        }
	}
};