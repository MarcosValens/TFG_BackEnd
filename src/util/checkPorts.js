const { portManager } = require("./../services");


async function areNewPorts(host, ports) {
    if (!ports) {
        return true;
    }
    const portsThatAreNotRepeated = ports.filter(newPort => {
        const portInPorts = host.ports.find(({port}) => port === parseInt(newPort.port));
        return !portInPorts;
    });
    if (!portsThatAreNotRepeated.length) {
        return true;
    }
    const newPorts = await portManager.create(portsThatAreNotRepeated);
    
    return newPorts;
}

module.exports = { areNewPorts };