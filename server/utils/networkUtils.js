function getNetworkUnit(networkIO) {
    const match = networkIO.match(/[a-zA-Z]+$/);
    return match ? match[0] : "B";
}

module.exports = {
    getNetworkUnit
}