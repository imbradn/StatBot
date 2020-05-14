module.exports = function getRank(rank, plusplusrank){

    if(plusplusrank === "SUPERSTAR"){
        var userRank = "MVP++"
        return userRank
    }else{
        if(rank === undefined){
            var userRank = "None"
            return userRank
        }else if(rank === "VIP"){
            var userRank = "VIP"
            return userRank
        }else if(rank === "VIP_PLUS"){
            var userRank = "VIP+"
            return userRank
        }else if(rank === "MVP"){
            var userRank = "MVP"
            return userRank
        }else if(rank === "MVP_PLUS"){
            var userRank = "MVP+"
            return userRank
        }else{
            var userRank = "UNKNOWN"
            return userRank

        }
    }
}
