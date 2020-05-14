var moment = require('moment');
var getNetworkLevel = require('../../stats/network/getNetworkLevel.js');
var getRank = require('../../stats/network/getRank.js');
module.exports = function getOverallEmbed(statEmbed, hypixelAPI, hypixelFriendAPI, hypixelGuildAPI, skinAPI, username, userID){
    // Sets users skin as the image of the embed.
    const rank = hypixelAPI.body.player.newPackageRank;
    const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;
    var karma = hypixelAPI.body.player.karma;
    var lastLogin = hypixelAPI.body.player.lastLogin;
    var howLongAgo = moment(lastLogin).fromNow();
    var month = moment(lastLogin).get('month') + 1;
    let lastLoginString = "\n(" + moment(lastLogin).get('year') + "/" + month + "/" + moment(lastLogin).get('date') + ")";
    if(hypixelGuildAPI.body.guild === null){
        var guildName = "None"
        var guildMembers = "0";
        var guildTag = "";
    }else{
        var guildName = hypixelGuildAPI.body.guild.name;
        var guildMembers = hypixelGuildAPI.body.guild.members.length;
        var guildTag = hypixelGuildAPI.body.guild.tag;
        if(guildTag === undefined){var guildTag = ""}else{var guildTag = " [" + hypixelGuildAPI.body.guild.tag + "]";}
    }
    var friendCount = hypixelFriendAPI.body.records.length;

    var statEmbed = statEmbed.setImage(skinAPI)
    .addField('**Level**', getNetworkLevel(hypixelAPI.body.player.networkExp), true)
    .addField('**Rank**', getRank(rank, plusplusrank), true)
    .addField('**Karma**', karma, true)
    .addField('**Last Login**', howLongAgo + lastLoginString, true)
    .addField('**Guild**', guildName + guildTag + "\n(" + guildMembers + " members)", true)
    .addField('**Friends**', friendCount, true)
    .setFooter(`made with 💕 by Bradn 🍣`)
    .setTimestamp();

    return statEmbed;
}