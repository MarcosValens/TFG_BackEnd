const { hostManager } = require("./../services");
const { manyPorts, singlePort } = require("./deletePorts");

async function manyHosts(hosts) {
    const hostIds = hosts.map(({ _id }) => _id);
    const portsFromHosts = hosts.map(({ports}) => ports);
    const portsDeleted = await manyPorts(portsFromHosts);
    if (!portsDeleted) {
        return false;
    }
    return await hostManager.deleteMany(hostIds);
}

async function singleHost(host) {
    const hostId = host._id;
    const ports = host.ports.map((port) => port);
    const portsDeleted = await manyPorts([ports]);
    if (!portsDeleted) {
        return false;
    }
    return await hostManager.delete(hostId);
}

module.exports = { manyHosts, singleHost };
