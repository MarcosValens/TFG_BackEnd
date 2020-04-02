const { portManager } = require("./../services");

async function manyPorts(ports) {
    const portIds = ports.map((portArray) => portArray.map(({_id}) => _id));
    const promiseDeletions = portIds.map(_ports => portManager.deleteMany(_ports));
    const resolved = await Promise.all(promiseDeletions);
    return resolved.indexOf(false) === -1;
}

async function singlePort(port) {
    return await portManager.delete(port._id);
}


module.exports = {manyPorts, singlePort};