const data = {
    instance: null
};
const Port = require("./../model/Port");

class PortManager {
    constructor() {
    }

    async create({port, open, service = ""}) {
        try {
            const port = await Port.create({port, open, service});
            return network;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async update(port, open, service = "") {
        try {
            await Port.update({port, open, service});
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async delete(port, open, service = "") {
        try {
            await Port.delete({port, open, service});
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async findById(id) {
        try {
            const port = await Port.findById(id);
            return port;
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