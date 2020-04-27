const data = {
    instance: null
};
const Port = require("./../model/Port").model;

class PortManager {
    constructor() {
    }

    async create(ports) {
        try {
            const portsCreated = await Port.create(ports);
            return portsCreated;
        } catch (ex) {
            return null;
        }
    }

    async update({_id, port, open, service = ""}) {
        try {
            await Port.updateOne({_id: _id}, {port, open, service});
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

    async findByIds(ids) {
        try {
            const ports = await Port.find().where("_id").in(ids).exec();
            return ports;
        } catch(e) {
            return []
        }
    }

    async deleteMany(portIds) {
        try {
            await Port.deleteMany({_id: { $in: portIds }});
            return true;
        } catch(e) {
            return false;
        }
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new PortManager();
    }
    return data.instance;
})();