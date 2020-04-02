module.exports = {
    delete: {
        hosts: require("./deleteHosts"),
        ports: require("./deletePorts"),
        networks: require("./deleteNetworks")
    }
}