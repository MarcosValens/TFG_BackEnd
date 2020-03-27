const { portManager } = require("./../../services");

async function validatePort (req, res, next) {
    const host = req.host;
    const port= req.body.portId;

    const portId = host.ports.find((portId) => portId = port);
    if (!portId){
        return res.status(401).json({"message": "Port not found"})
    }
    res.port(portManager.findById(portId));
    next()
}

module.exports = validatePort;