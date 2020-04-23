const fs = require("fs");
const path = require("path");
const staticFolder = path.join(process.cwd(), "static");

module.exports = async function(req, res, next) {
    const {id} = req.params;
    try {
        const userFiles = path.join(staticFolder, id);
        const dirFiles = await fs.readdirSync(userFiles);
        const file = dirFiles[0];
        req.image = path.join(userFiles, file);
    } catch(e) {
        req.image = path.join(process.cwd(), "static/default_avatar.jpg");
    } finally {
        next();
    }
}