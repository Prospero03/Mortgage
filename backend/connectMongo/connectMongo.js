const mongoose = require("mongoose");

const connectMongo = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("База данных MongoDB подключена")
    }catch(e){
        console.log(e)
    }
}

connectMongo();