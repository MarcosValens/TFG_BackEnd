const data = {
    instance: null
};
const bcrypt = require("bcrypt");
const { User, Photo } = require("./../model/");
class UserManager {
    constructor() {}

    async create({ email, name, surname, issuer, password = "" }) {
        try {
            const userData = { email, name, surname, createdWith: issuer };
            
            if (password) {
                const hashedPassword = await this._hashPassword(password);
                userData.password = hashedPassword;
            }
            
            await (await User.create(userData)).save();
            return true;
        } catch (ex) {
            return null;
        }
    }

    async _hashPassword(password) {
        const rounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const salt = await bcrypt.genSalt(rounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async findByEmail(email) {
        const userFound = await User.findOne({ email });
        return userFound;
    }

    async update(userFromDataBase, userData) {
        userFromDataBase.name = userData.data.name || userFromDataBase.name;
        userFromDataBase.surname = userData.data.surname || userFromDataBase.surname;
        /*
if (userData.photo) {
            const photo = new Photo()
            photo.file.data = userData.photo.buffer;
            photo.file.contentType = userData.photo.mimetype;
            photo.name = userData.photo.originalName;
            await photo.save();
            userFromDataBase.photo = photo;
        }
        */
        if (userData.password) {
            const hashedPassword = await this._hashPassword(userData.data.password);
            userFromDataBase.password = hashedPassword;
        }
        try {
            await userFromDataBase.save();
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new UserManager();
    }
    return data.instance;
})();
