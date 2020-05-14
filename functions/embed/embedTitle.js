module.exports = function embedTitle(statEmbed, username, userID, hypixelAPI){
    const displayname = hypixelAPI.body.player.displayname;
    const rank = hypixelAPI.body.player.newPackageRank;
    const plusplusrank = hypixelAPI.body.player.monthlyPackageRank;

    if(plusplusrank === "SUPERSTAR"){
        var statEmbed = statEmbed.setAuthor(`[MVP++] ` + displayname, 'https://visage.surgeplay.com/face/' + userID, 'https://plancke.io/hypixel/player/stats/' + displayname);
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

    return statEmbed;
}