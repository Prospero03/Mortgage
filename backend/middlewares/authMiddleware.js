const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = {
    verifyToken: async (req,res, next)=>{
        const token = req.cookies.MortgageApp;
        if(!token){
            return res
            .status(401)
            .json({message: "Неверный Токен"});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Fetch userDetails
            const user = await User.findById(decoded.id);
            if(!user) {
                return res.status(404).json({message:"Пользователь не найден"})
            }

            req.user = user;
            next();

        }catch(error){
            res.status(400).json({message:"Ошибка Токена"}) 
        }
    },

    authorizeRole: (role) =>{
        return (req,res,next)=>{
            if(req.user.role !== role){
                return res.status(403).json({message: "Доступ Запрещён"})
            }
            next();
        }
    }

};

module.exports = authMiddleware;
