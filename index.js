require("dotenv").config();

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const routes = require("./src/routes");
const port = process.env.PORT || 8000;

const helmet = require("helmet");
const cors = require("cors");

const corsOptions = {
    allowedHeaders: ["Authorization", "Accept", "Origin"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: process.env.WHITELIST || "http://localhost:8080"
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

routes.forEach(({path, router}) => app.use(`/${path}`, router));

app.use((req, res) => {
    res.status(400).json({message: "Resource not found wtf?"});
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => console.log('Connected to DB!'));