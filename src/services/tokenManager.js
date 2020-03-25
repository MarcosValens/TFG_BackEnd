class TokenManager {
    constructor() {}

    create(user) {
        return "";
    }

    validate(token) {
        return true;
    }
}
const instance = {
    tokenManager: null
};

module.exports = (() => {
    if (!instance.tokenManager) {
        instance.tokenManager = new TokenManager();
    }
    return instance.tokenManager;
})();
