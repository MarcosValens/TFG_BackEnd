async function validatePort (req, res, next) {
    const host = req.host;
    const port= req.body.portId;

    const portId = host.ports.find((portId) => portId = port);
    if (!portId){

    }
}