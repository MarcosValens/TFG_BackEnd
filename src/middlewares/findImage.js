const fs = require("fs");
const path = require("path");

module.exports = async function(req, res, next) {
    const {id} = req.params;
    try {
        const dirFiles = await fs.readdirSync(`./static/${id}`);
        const file = dirFiles[0];
        req.image = path.join(process.cwd(), `static/${id}/${file}`);
    } catch(e) {
        req.image = path.join(process.cwd(), "static/default_avatar.jpg");
    } finally {
        next();
    }
}