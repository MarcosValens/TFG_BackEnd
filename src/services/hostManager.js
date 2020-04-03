const data = {
    instance: null
};
const Host = require("./../model/Host");

class HostManager {
    constructor() {}

    async create({ ipAddress, description = "", ports = [] }) {
        try {
            const host = await Host.create({ ipAddress, description, ports });
            return host;
        } catch (ex) {
            return null;
        }
    }

    async update({ _id, ipAddress, description = "", ports = [] }) {
        try {
            await Host.updateOne({_id }, { ipAddress, description, ports });
            return true;
        } catch (ex) {
            return null;
        }
    }

    async delete(hostId) {
        try {
            await Host.deleteOne({ _id: hostId });
            return true;
        } catch (ex) {
            return null;
        }
    }

    async findById(id) {
        try {
            const host = await Host.findById(id);
            return host;
        } catch (ex) {
            return {};
        }
    }

    async findByIds(ids) {
        try {
            const hosts = await Host.find()
                .where("_id")
                .in(ids)
                .exec();
            return hosts;
        } catch (e) {
            return [];
        }
    }

    async deleteMany(hostIds) {
        try {
            await Host.deleteMany({ _id: { $in: hostIds } });
            return true;
        } catch (e) {
            return false;
        }
    }

    
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new HostManager();
    }
    return data.instance;
})();
