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

    async update(name, gateway, hosts) {
        try {
            await Network.update({name, gateway, hosts});
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async delete(name, gateway, hosts) {
        try {
            await Network.delete({name, gateway, hosts});
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async findById(id) {
        try {
            const network = await Network.findById(id)
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