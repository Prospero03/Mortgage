const express = require("express");
const app = express();
const cors =require("cors");
// 2. Добавление порта .env , process.env.PORT
require("dotenv").config();
// 3.Подключеник MongoDB
require("./connectMongo/connectMongo")

const mortgageApi = require("./routes/mortgage");

app.use(express.json())
app.use(cors(
    {origin: ["http://localhost:3000"],
    credentials: true,}
));


// 4. Тестовый запуск 
//app.get("/", (req,res)=>{
//   res.send("Привет МВЕК")
//})

//5.router
app.use("/api/v1",mortgageApi)


// 1. Запускаем Сервер
app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен на порте: ${process.env.PORT}`)
})