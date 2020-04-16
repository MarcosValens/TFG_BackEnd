module.exports = function ({ check, validationResult, utils }) {
    return {
        create: [
            check("name")
                .isString()
                .escape()
                .custom((name) =>
                    name.length < 3 || name.length > 25
                        ? Promise.reject(
                              "Name must be between 3 and 25 characters"
                          )
                        : true
                ),
        ],
        update: [
            check("name")
                .isString()
                .escape()
                .custom((name) =>
                    name.length < 3 || name.length > 25
                        ? Promise.reject(
                              "Name must be between 3 and 25 characters"
                          )
                        : true
                ),
            check("gateway")
                .isString()
                .escape()
                .custom((gateway) =>
                    !utils.isValidIp(gateway)
                        ? Promise.reject("Please provide a valid IP address")
                        : true
                ),
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
