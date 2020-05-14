module.exports = function getNetworkLevel(exp){
    let BASE = 10_000;
    let GROWTH = 2_500;
    let REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
    let REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
    let GROWTH_DIVIDES_2 = 2 / GROWTH;

    let networklevel = Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));
    return networklevel
}