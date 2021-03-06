if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");

// Socket server initialization
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const handleConnection = require("./src/chat")
// Overwrite the listen function and wrap it to a start function
app.start = app.listen = function () {
    return server.listen.apply(server, arguments);
};

const routes = require("./src/routes");
const port = process.env.PORT || 8000;

const staticsPath = path.join(__dirname, "static");

if (!fs.existsSync(staticsPath)) {
    fs.mkdirSync(staticsPath);
}

const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const fileLogger = require("expressjs-file-logger");
const compression = require("compression");
const { notFoundMiddleware } = require("./src/middlewares");

const whitelist = process.env.WHITELIST.trim().split(",");

const corsOptions = {
    allowedHeaders:
        "Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Refresh-Token, access-token",
    allowedMethods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    origin(origin, next) {
        if (whitelist.includes(origin) || !origin) {
            return next(null, true);
        }
        next(new Error("Origin not alowed"));
    },
    exposedHeaders: "access-token",
    maxAge: 3600,
};

app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));     

app.use(express.json({ limit: "50mb"}));

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: false,
    })
);

app.use(passport.initialize());
require("./config/passport-setup");

if (process.env.NODE_ENV === "production") {
    app.use(
        fileLogger({
            storagePath: path.join(process.cwd(), "logs"),
            logMode: "all",
            logFilesExtension: ".log",
            logRequestBody: true,
            logType: "hour",
        })
    );
}
app.use(express.static(staticsPath));
routes.forEach(({ path, router }) => app.use(`/${path}`, router));

app.use(notFoundMiddleware);
app.start(port);

io.on("connection", handleConnection.bind(io));

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/portscanner?authSource=admin`;

try {
    mongoose.connect(
        process.env.MONGO_URL || mongoUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        },
        () => console.log("Connected to DB!")
    );
} catch(e) {
    console.log(e)
}
