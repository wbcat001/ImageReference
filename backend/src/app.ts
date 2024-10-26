
import express, {Request, Response} from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoute from "./route/AuthRoute";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.get("/", (req:Request, res:Response) => {
    res.status(200).send("Hello World");
})

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute);


app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);

}).on("error", (error) => {
    throw new Error(error.message)
});


