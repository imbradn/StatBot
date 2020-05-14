const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const snekfetch = require("snekfetch");
var moment = require('moment');
const { hypixeltoken } = require("../../botconfig.json");
var getNetworkLevel = require('../../functions/getNetworkLevel.js');
var getRank = require('../../functions/getRank.js');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'noncheck',
			group: 'hypixel',
			memberName: 'noncheck',
            description: 'Checks a users status. (If they are a non or not)',
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to stat check?',
                    type: 'string'
                }
            ]
		});
	}

	async run(message, { user }) {
        let username = user.toLowerCase();

        const mojangAPI = await snekfetch.get('https://api.mojang.com/users/profiles/minecraft/' + username);
        const hypixelAPI = await snekfetch.get(`https://api.hypixel.net/player?key=${hypixeltoken}&name=` + username);
        if(hypixelAPI.body.player === null) {
            const noExist = new MessageEmbed()
                .setDescription(`The user **` + user + `** does not exist!`);
            
            message.say(noExist);

        } else {
            const userID = mojangAPI.body.id;
            const namemcAPI = await snekfetch.get(`https://api.namemc.com/profile/${userID}/friends`);
            const hypixelFriendAPI = await snekfetch.get(`https://api.hypixel.net/friends?key=${hypixeltoken}&uuid=` + userID);
            const skinAPI = 'https://visage.surgeplay.com/full/208/' + userID;
            let friends = namemcAPI.body.length;
            var friendCount = hypixelFriendAPI.body.records.length;
            const rank = hypixelAPI.body.player.newPackageRank;
            const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;
            var displayname = hypixelAPI.body.player.displayname;


            var embed = new MessageEmbed();
            
                if(plusplusrank === "SUPERSTAR"){
                    var embed = embed.setAuthor(`[MVP++] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                }else{
                    if(rank === undefined){
                        var embed = embed.setAuthor(displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                    }else if(rank === "VIP"){
                        var embed = embed.setAuthor(`[VIP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                    }else if(rank === "VIP_PLUS"){
                        var embed = embed.setAuthor(`[VIP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                    }else if(rank === "MVP"){
                        var embed = embed.setAuthor(`[MVP] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                    }else if(rank === "MVP_PLUS"){
                        var embed = embed.setAuthor(`[MVP+] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + username);
                    }
    
                }

                var embed = embed.setImage(skinAPI);
                var embed = embed.addField('**NameMC Friends**', friends, true).addField('**Hypixel Friends**', friendCount, true).addField('**Hypixel Rank**', getRank(rank, plusplusrank), true);

                var nonLevel = 0;
                if(getRank(rank, plusplusrank) === "MVP++"){
                    var nonLevel = nonLevel + 3;
                }else if(getRank(rank, plusplusrank) === "MVP+"){
                    var nonLevel = nonLevel + 2;
                }else if(getRank(rank, plusplusrank) === "MVP"){
                    var nonLevel = nonLevel + 1;
                }
                if(friends > 1000){
                    var nonLevel = nonLevel + 3;
                }else if(friends > 500){
                    var nonLevel = nonLevel + 2;
                }else if(friends > 100){
                    var nonLevel = nonLevel + 1;
                }
                if(friendCount > 1000){
                    var nonLevel = nonLevel + 3;
                }else if(friendCount > 500){
                    var nonLevel = nonLevel + 2;
                }else if(friendCount > 100){
                    var nonLevel = nonLevel + 1;
                }
                var nonString = "";
                if(nonLevel >= 8){
                    var nonString = "Popular";
                }else if(nonLevel >= 5){
                    var nonString = "Relevant";
                }else if(nonLevel >= 3){
                    var nonString = "Casual";
                }else{
                    var nonString = "Irrelevant";
                }

                var embed = embed.addField('**Status**', nonString, true).addField('**NameMC**', `[Click Here](https://namemc.com/profile/${displayname})`, true).setFooter('This is based fully off of statistics and the status shouldnt be taken seriously.');
            message.say(embed);
        }


	}
};