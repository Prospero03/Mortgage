const express = require("express");
const app = express();
// 8. Подключение client
const cors =require("cors");

// 7. Добавление Cookie
const cookieParser = require("cookie-parser");


// 2. Добавление порта .env , process.env.PORT
require("dotenv").config();
// 3.Подключеник MongoDB
require("./connectMongo/connectMongo")










// 5. Импорт маршрутов
const userApi = require("./routes/user");
const mortgageApi = require("./routes/mortgage");
const adminApi = require("./routes/admin");
const calculatorApi = require("./routes/calculators")

// 8. Подключение client
app.use(cors(
    {origin: ["http://localhost:3000"],
    credentials: true,}
));

//5. Обязательно для подключения
app.use(express.json())

//7 Подключение Cookie
app.use(cookieParser());



// 4. Тестовый запуск 
//app.get("/", (req,res)=>{
//   res.send("Привет МВЕК")
//})

//6.Подключение маршрутов
app.use("/api/v1", userApi);
app.use("/api/v1",mortgageApi);
app.use("/api/v1",adminApi);
app.use("/api/v1",calculatorApi);



// 1. Запускаем Сервер
app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен на порте: ${process.env.PORT}`)
})