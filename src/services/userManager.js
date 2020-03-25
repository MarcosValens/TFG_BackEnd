const data = {
    instance
};
const bcrypt = require("bcrypt");
const { User } = require("./../model/");
class UserManager {
    constructor() {}

    async create({email, name, surname, password}) {
        try {
            const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS || 10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({email, name, surname, password: hashedPassword});
            return user;
        } catch(ex) {
            console.log(ex);
            return null;
        }
        
    }

    async emailExists(email) {
        const userFound = await User.find({email});
        return !userFound;
    }
}

module.exports = (() => {
    if (!data.instance) {
        data.instance = new UserManager();
    }
    return data.instance;
})
