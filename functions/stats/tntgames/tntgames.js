module.exports = function getTntEmbed(statEmbed, hypixelAPI, username, userID){

    var tntcoins = hypixelAPI.body.player.stats.TNTGames.coins;
    if(tntcoins === undefined){var tntcoins = 0;}
    var tntwins = hypixelAPI.body.player.stats.TNTGames.wins;
    if(tntwins === undefined){var tntwins = 0;}
    var tnttagwins = hypixelAPI.body.player.stats.TNTGames.wins_tntag;
    if(tnttagwins === undefined){var tnttagwins = 0;}
    var tnttagkills = hypixelAPI.body.player.stats.TNTGames.kills_tntag;
    if(tnttagkills === undefined){var tnttagkills = 0;}
    var bowspleefwins = hypixelAPI.body.player.stats.TNTGames.wins_bowspleef;
    if(bowspleefwins === undefined){var bowspleefwins = 0;}
    var tntrunwins = hypixelAPI.body.player.stats.TNTGames.wins_tntrun;
    if(tntrunwins === undefined){var tntrunwins = 0;}
    var tntcurrentwinstreak = hypixelAPI.body.player.stats.TNTGames.winstreak;
    if(tntcurrentwinstreak === undefined){var tntcurrentwinstreak = 0;}

    var statEmbed = statEmbed
    .setDescription("TnT Games")
    .addField(`**Coins**`, `${tntcoins}`, true)
    .addField(`**Wins**`, `${tntwins}`, true)
    .addField(`\u200B`, `\u200B`, true)
    .addField(`**TnT Tag Wins**`, `${tnttagwins}`, true)
    .addField(`**TnT Tag Kills**`, `${tnttagkills}`, true)
    .addField(`**Bow Spleef Wins**`, `${bowspleefwins}`, true)
    .addField(`**TnT Run Wins**`, `${tntrunwins}`, true)
    .addField(`**Current Win Streak**`, `${tntcurrentwinstreak}`, true)
    .setThumbnail('https://visage.surgeplay.com/face/64/' + userID);

    return statEmbed
}