const User = require ("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//Controller - Регистрация
exports.signupUser = async (req,res) =>{
    //1. Создаем обработчик ошибок
    try {

        const {email, username, password} = req.body;
        
        //2. Основное условие
        if (!email || !username || !password){
            return res
                .status(400)
                .json({success: false, error: "Введены не все данные"})
        }

        //3. Завершается если Пользователь с таким email или username уже существует
        const existingUser = await User.findOne(
            { $or: [{email}, {username}]});
        if(existingUser){
            return res
            .status(400)
            .json({success: false, message: "Пользователь с таким email или username уже существует"})
        }

        //4. Создаем скрытие пароля
        const hashedPass = await bcrypt.hash(password, 10);

        //5. Сохранение пользователя
        const newUser = new User({ email, username, password:hashedPass});
        await newUser.save();
        
        return res
        .status(200)
        .json({success: true, message: "Вы успешно зарегистрировались"})
        
    } catch (error) {
        //1.2 Вводим стандартные команды для catch
        return res
        .status(500)
        .json({success:false, error:"Ошибка Сервера"})
    }
}


exports.loginUser = async (req,res) =>{
    //1. Создаем обработчик ошибок
    try {

        const {email, password} = req.body;
        
        //2. Основное условие
        if (!email || !password){
            return res
                .status(400)
                .json({success: false, message: "Введены не все данные"})
        }

        //3. Недействительные учетные данные
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res
            .status(400)
            .json({success: false, error: "Недействительные учетные данные"})
        }

        //4.  Проверка пароля
        const checkPass = await bcrypt.compare(password, existingUser.password);
        if(!checkPass){
            return res
            .status(400)
            .json({success: false, error: "Недействительные учетные данные"})
        }
        //6 Cookie
        const token = jwt.sign(
            {
                id: existingUser._id,
                email:existingUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d", //Token 30 дней
            }
        )
        res.cookie("MortgageApp", token,{
            http: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "None",
        })


        //5. Вход в аккаунт
        return res
        .status(200)
        .json({success: true, message: "Вы успешно вошли"})
        
    } catch (error) {
        //1.2 Вводим стандартные команды для catch
        return res
        .status(500)
        .json({success:false, error:"Ошибка Сервера"})
    }
}

exports.checkCookie = (req,res) =>{
    try {
        const token = req.cookies.MortgageApp;
        if (token) {
            return res.status(200).json({message:true});
        } 
        return res.status(200).json({message: false});
    } catch (error) {
        //console.log(error);
        return res.status(500).json({error: "Ошибка Сервера"})
    }
}


exports.logout = (req,res) =>{
    res.clearCookie("MortgageApp",{
        httpOnly:true,
        secure: true,
        sameSite:"None",
        path: '/'
    })
    res.json({message: "Вы успешно вышли"})
}

exports.getProfileData = (req,res) =>{
    try{
        const {user} = req;
        const {password, ...safeUserData}  = user._doc;
        //console.log(safeUserData);
        res.status(200).json({data:safeUserData});
    }catch(error){
        return res.status(500).json({error: "Ошибка Сервера"})
    }
}
