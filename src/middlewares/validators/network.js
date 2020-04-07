const { networkManager, userManager } = require("./../../services");

async function validateNetwork(req, res, next) {
    const idNetwork = req.params.networkId || req.body.networkId || req.query.networkId;
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    if (!userFromDB) {
        return res.status(401).json({message: "User not found"});
    }
    
    const network = userFromDB.networks.find(networkId => {
        return networkId.toString() === idNetwork
    });
    if (!network) {
        return res.status(401).json({ message: "Network not found" });
    }
    const networkFromDataBase = await networkManager.findById(network);
    req.network = networkFromDataBase;
    req.userDb = userFromDB;
    next();
}

async function validateNetworkName(req, res, next) {
    const networkName = req.body.name;
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    const networkPromises = userFromDB.networks.map(networkManager.findById);
    const networks = await Promise.all(networkPromises);
    const networkId = req.body.networkId;
    const networkNameDB = networks.find(
        network => network && network.name === networkName
    );

    if (!networkName) {
        return res.status(400).json({message: "You must provide a name"})
    }
    if (!networkNameDB) {
        return next();
    }
    const isSelfNetwork =
        networkId && networkNameDB._id.toString() === networkId;
    if (!isSelfNetwork || !networkId) {
        return res.status(400).json({ message: "This name already exists" });
    }

    next();
}

module.exports = {
    validateNetwork,
    validateNetworkName
};
