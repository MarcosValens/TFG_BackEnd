const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
    async destination(req, file, cb) {
        const { id } = req.user;
        const dir = path.join(process.cwd(), `./static/${id}`);
        const exists = await fs.existsSync(dir);
        if (!exists) {
            return fs.mkdir(dir, error => cb(error, dir));
        }
        const files = await fs.readdirSync(dir);
        const fileDeletionPromises = files.map(file => {
          return fs.unlinkSync(path.join(dir, file));
        })
        await Promise.all(fileDeletionPromises);
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const { id } = req.user;
        const fileType = file.originalname.split(".")[1];
        cb(null, `${id}.${fileType}`);
    }
});

const upload = multer({ storage });
module.exports = upload;
