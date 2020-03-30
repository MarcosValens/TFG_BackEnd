const data = {
    instance: null
};
const Port = require("./../model/Port");

class PortManager {
    constructor() {
    }

    async create({port, open, service = ""}) {
        try {
            const portCreated = await Port.create({port, open, service});
            return portCreated;
        } catch (ex) {
            return null;
        }
    }

    async update({port, open, service = ""}) {
        try {
            await Port.update({port, open, service});
            return true;
        } catch (ex) {
            return null;
        }
    }

    async delete(portId) {
        try {
            await Port.deleteOne({_id: portId});
            return true;
        } catch (ex) {
            return null;
        }
    }

    async findById(id) {
        try {
            const port = await Port.findById(id);
            return port;
        } catch (ex) {
            return {};
        }
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new PortManager();
    }
    return data.instance;
})();