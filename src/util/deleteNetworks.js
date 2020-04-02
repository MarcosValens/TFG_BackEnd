const { networkManager, hostManager } = require("./../services");
const { manyHosts } = require("./deleteHosts");
async function wipe(network) {
    if (!network) {
        return false;
    }
    const hosts = await hostManager.findByIds(network.hosts);
    const hostsAndPortsDeleted = await manyHosts(hosts);
    if (!hostsAndPortsDeleted) {
        return false;
    }
    return await networkManager.delete(network._id);
}

module.exports = { wipe };
