const { hostManager } = require("./../../services");

async function validateHost(req, res, next) {
    const network = req.network;
    const hostId = req.params.hostId;
    const hostIdFound = network.hosts.find(_idHost => _idHost === hostId);
    if (!hostIdFound) {
        return res.status(401).json({error: "This is not a host of your network"});
    }    
    const hostFromDataBase = await hostManager.findById(hostIdFound);
    req.host = hostFromDataBase;
    next();
}

module.exports = validateHost;