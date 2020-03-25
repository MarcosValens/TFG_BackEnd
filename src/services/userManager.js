const data = {
    instance: null
};
const bcrypt = require("bcrypt");
const { User } = require("./../model/");
class UserManager {
    constructor() {}

    async create({email, name, surname, password}) {
        try {
            const rounds = parseInt(process.env.SALT_ROUNDS) || 10;
            const salt = await bcrypt.genSalt(rounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({email, name, surname, password: hashedPassword});
            return user;
        } catch(ex) {
            console.log(ex);
            return null;
        }
        
    }

    async findByEmail(email) {
        const userFound = await User.find({email});
        return userFound;
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new UserManager();
    }
    return data.instance;
})();
