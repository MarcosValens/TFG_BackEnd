require("dotenv").config();

const fs = require("fs");
const path = require("path");
const os = require("os");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
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

const corsOptions = {
    allowedHeaders:
        "Authorization, Origin, X-Requested-With, Content-Type, Accept",
    allowedMethods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    origin: process.env.WHITELIST.trim().split(",") || "http://localhost:8080",
    maxAge: 3600,
};
app.use(compression())
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(port);
const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/portscanner?authSource=admin`;

mongoose.connect(
    mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    () => console.log("Connected to DB!")
);
