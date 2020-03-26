const data = {
    instance: null
};
const bcrypt = require("bcrypt");
const { User } = require("./../model/");
class UserManager {
    constructor() {}

    async create({ email, name, surname, issuer, password = "" }) {
        try {
            const rounds = parseInt(process.env.SALT_ROUNDS) || 10;
            const userData = { email, name, surname, createdWith: issuer };
            
            if (password) {
                const salt = await bcrypt.genSalt(rounds);
                const hashedPassword = await bcrypt.hash(password, salt);
                userData.password = hashedPassword;
            }
            
            await (await User.create(userData)).save();
            return true;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    async findByEmail(email) {
        const userFound = await User.findOne({ email });
        return userFound;
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new UserManager();
    }
    return data.instance;
})();
