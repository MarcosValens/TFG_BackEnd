const { portManager } = require("./../services");


async function areNewPorts(host, ports) {
    if (!ports) {
        return true;
    }
    const portsThatAreNotRepeated = ports.filter(newPort => {
        const portInPorts = host.ports.find(({port, open}) => port === newPort.port && open === newPort.open);
        return !portInPorts;
    });
    if (!portsThatAreNotRepeated.length) {
        return true;
    }
    const newPorts = await portManager.create(portsThatAreNotRepeated);
    
    return newPorts;
}

module.exports = { areNewPorts };