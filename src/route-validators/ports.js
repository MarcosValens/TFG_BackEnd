module.exports = function ({ check, validationResult }) {
    return {
        update: [
            check("portNumber")
                .isNumeric()
                .notEmpty()
                .custom((port) => port > 0 && port <= 65500 ? true : Promise.reject("Port range should be between 1 and 65500")),
            check("open")
                .isBoolean(),
            check("service")
                .isString()
                .escape()
                .custom(service => service.length > 255 ? Promise.reject("The service name must be less or equal than 255 characters") : true)
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
