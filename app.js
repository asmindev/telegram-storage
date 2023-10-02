const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const router = require("./src/api");
const connectDB = require("./src/database/connection");
const bot = require("./src/telegram/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(
//     fileUpload({
//         limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
//     })
// );
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, async () => {
    const current = await bot.getMe();
    const name = current.first_name;
    const id = current.id;
    console.log(`App listening at http://localhost:${port}`);
    console.log(`Bot started as ${name} with id ${id}`);
});
