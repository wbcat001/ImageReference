
import express, {Request, Response} from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoute from "./route/AuthRoute";
import imageRetrieveRoute from "./route/RetrieveImageRoute";
import myListRoute from "./route/MyListRoute";
import cors from "cors";

import jwt from "jsonwebtoken";

dotenv.config();
const app = express();


const PORT = process.env.PORT;

app.get("/", (req:Request, res:Response) => {
    res.status(200).send("Hello World");
})

app.use(cookieParser());

// cors
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
        optionsSuccessStatus: 200
    })
)

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/image", imageRetrieveRoute);
app.use("/api/mylist", myListRoute)
app.get("/api/hello", (req, res) => {
    res.status(200).json("hello")
})


app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);

}).on("error", (error) => {
    throw new Error(error.message)
});


