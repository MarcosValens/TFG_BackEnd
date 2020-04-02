const { portManager } = require("./../services");

module.exports = async function(portIds) {
    await portManager.deleteMany(portIds)
}