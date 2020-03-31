require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./src/routes");
const port = process.env.PORT || 8000;

const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const fileLogger = require("expressjs-file-logger");
const { notFoundMiddleware } = require("./src/middlewares");

const corsOptions = {
    allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
    allowedMethods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    origin: process.env.WHITELIST || "http://localhost:8080",
    maxAge: 3600
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
require("./config/passport-setup");

if (process.env.MODE === "production") {
    app.use(
        fileLogger({
            storagePath: path.join(process.cwd(), "logs"),
            logMode: "all",
            logFilesExtension: ".log",
            logRequestBody: true,
            logType: "hour"
        })
    );
}
app.use(express.static("static"))
routes.forEach(({ path, router }) => app.use(`/${path}`, router));

app.use(notFoundMiddleware);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

// Connect to DB
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log("Connected to DB!")
);
