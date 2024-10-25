
import express, {Request, Response} from "express";
import dotenv from "dotenv"

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.get("/", (req:Request, res:Response) => {
    res.status(200).send("Hello World");
})

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);

}).on("error", (error) => {
    throw new Error(error.message)
});

