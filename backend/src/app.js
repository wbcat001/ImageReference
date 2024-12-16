"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
// Router
var AuthRoute_1 = require("./route/AuthRoute");
var RetrieveImageRoute_1 = require("./route/RetrieveImageRoute");
var MyListRoute_1 = require("./route/MyListRoute");
var ImageAnalysisRoute_1 = require("./route/ImageAnalysisRoute");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
app.get("/", function (req, res) {
    res.status(200).send("Hello World");
});
app.use((0, cookie_parser_1.default)());
// cors
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", AuthRoute_1.default);
app.use("/api/image", RetrieveImageRoute_1.default);
app.use("/api/mylist", MyListRoute_1.default);
app.get("/api/hello", function (req, res) {
    res.status(200).json("hello");
});
app.use("/api/analy", ImageAnalysisRoute_1.default);
app.listen(PORT, function () {
    console.log("Server running at PORT: ", PORT);
}).on("error", function (error) {
    throw new Error(error.message);
});
