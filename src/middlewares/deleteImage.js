const fs = require("fs");
const path = require("path");
const staticFolder = path.join(process.cwd(), "static");

module.exports = function (userId) {
    const userFiles = path.join(staticFolder, userId);
    if (!fs.existsSync(userFiles)) return true;
    const dirContent = fs.readdirSync(userFiles);
    dirContent.forEach((file) => fs.unlinkSync(path.join(userFiles, file)));
    fs.rmdirSync(userFiles);
    return true;
};
