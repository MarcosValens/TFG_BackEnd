const { portManager } = require("./../services");

async function manyPorts(ports) {
    const portIds = ports.map((portArray) => portArray.map(({_id}) => _id));
    const promiseDeletions = portIds.map(_ports => portManager.deleteMany(_ports));
    const resolved = await Promise.all(promiseDeletions);
    return resolved.indexOf(false) === -1;
}

async function singlePort(host, port) {
    host.ports.pull(port);
    await host.save();
    const portGotDeleted = await portManager.delete(port._id);
    return portGotDeleted;
}


module.exports = {manyPorts, singlePort};