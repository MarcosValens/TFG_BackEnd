const { portManager } = require("./../../services");

async function validatePort (req, res, next) {
    const host = req.hostDb;
    const port = req.body.portId;

    const portId = host.ports.find((_port) => _port._id.toString() === port);
    if (!portId){
        return res.status(401).json({"message": "Port not found"})
    }
    const portFromDataBase = await portManager.findById(portId);
    req.port = portFromDataBase;
    next()
}

module.exports = validatePort;