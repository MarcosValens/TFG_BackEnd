const data = {
    instance: null,
};
const Host = require("./../model/Host");

class HostManager {
    constructor() {}

    async create(hosts) {
        try {
            const hostsCreated = await Host.create(hosts);
            return hostsCreated;
        } catch (ex) {
            return null;
        }
    }

    async update(host) {
        try {
            await Host.updateOne(
                { _id: host._id },
                {
                    ipAddress: host.ipAddress,
                    description: host.description,
                    alive: host.alive,
                }
            );
            return true;
        } catch (ex) {
            return null;
        }
    }

    async updateSweep(hostIds, alives) {
        try {
            console.log(alives);
            const promises = hostIds.map((id, index) => Host.updateOne({_id: id}, {alive: alives[index]}));
            await Promise.all(promises);
            return true;
        } catch (ex) {
            console.log(ex)
            return null;
        }
    }

    async updatePort(host, port) {
        try {
            await Host.updateOne(
                { _id: host._id, "ports._id": port._id },
                {
                    $set: {
                        "ports.$": port,
                    },
                }
            );
            return true;
        } catch (e) {
            console.log(e);
            return false;
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
            const hosts = await Host.find().where("_id").in(ids).exec();
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
