const data = {
    instance: null
};
const {Network} = require("./../model/Network");

class NetworkManager {
    constructor() {
    }

    async create({name, gateway, hosts}) {
        try {
            await Network.create({name, gateway, hosts});
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

    async getAllUserNetworks(email) {
        try {
            const networks = await Network.find({user: email});
            return networks;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new NetworkManager();
    }
    return data.instance;
})();