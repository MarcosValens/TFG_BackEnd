const data = {
    instance: null
};
const Network = require("./../model/Network");

class NetworkManager {
    constructor() {
    }

    async create({name, gateway = "", hosts = []}) {
        try {
            const network = await Network.create({name, gateway, hosts});
            return network;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async update({networkId, name, gateway = "", hosts = []}) {
        try {
            await Network.updateOne({_id: networkId}, {name, gateway, hosts});
            return true;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async delete(networkId) {
        try {
            await Network.deleteOne({_id: networkId});
            return true;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async findById(id) {
        try {
            const network = await Network.findById(id);
            return network;
        } catch (ex) {
            console.log(ex);
            return {};
        }
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new NetworkManager();
    }
    return data.instance;
})();