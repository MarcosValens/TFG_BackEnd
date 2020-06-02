const { portManager } = require("./../services");


async function areNewPorts(host, ports) {
    if (!ports) {
        return {newPorts: [], existingPorts: []};
    }
    const portsThatAreNotRepeated = ports.filter(newPort => {
        const portInPorts = host.ports.find(({port}) => port === parseInt(newPort.port));
        return !portInPorts;
    });
    const repeatedPorts = ports.filter(newPort => {
        const portInPorts = host.ports.find(({port}) => port === parseInt(newPort.port));
        return !!portInPorts;
    }).map(port => {
        const index = host.ports.map(({port}) => port).indexOf(port.port);
        const otherPort = host.ports[index];
        if (!otherPort.service) {
            otherPort.service = port.service;
        }
        return otherPort
    })
    if (!portsThatAreNotRepeated.length) {
        return {newPorts: [], existingPorts: repeatedPorts};
    }

    const newPorts = await portManager.create(portsThatAreNotRepeated);
    return {newPorts, existingPorts: repeatedPorts};
}

module.exports = { areNewPorts };