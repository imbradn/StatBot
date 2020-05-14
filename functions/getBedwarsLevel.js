const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;
const HIGHEST_PRESTIGE = 10;
module.exports = function getBedwarsLevel(exp){

const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;
    var prestiges = Math.floor(exp / XP_PER_PRESTIGE);
    var level = prestiges * LEVELS_PER_PRESTIGE;
    var expWithoutPrestiges = exp - (prestiges * XP_PER_PRESTIGE);

    for(let i = 1; i <= EASY_LEVELS; ++i){
        var expForEasyLevel = "7000";
        if(expWithoutPrestiges < expForEasyLevel){
            break;
        }
        level++;
        expWithoutPrestiges -= expForEasyLevel;
    }
    //returns players bedwars level, remove the Math.floor if you want the exact bedwars level returned
    const urlevel = Math.floor(expWithoutPrestiges / 5000) + 4;
    return level + urlevel; 

}