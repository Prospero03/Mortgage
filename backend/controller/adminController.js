const User = require ("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { Parser } = require('json2csv');


const Calculator = require("../models/calculator")
const Mortgage = require("../models/mortgage");

exports.adminLogin = async (req,res) =>{
    try {

        const {email, password} = req.body;
        
        //2. Основное условие
        if (!email || !password){
            return res
                .status(400)
                .json({success: false, error: "Введены не все данные"})
        }

        //3. Недействительные учетные данные
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res
            .status(400)
            .json({success: false, message: "Недействительные учетные данные"})
        }

        //4.  Проверка пароля
        const checkPass = await bcrypt.compare(password, existingUser.password);
        if(!checkPass){
            return res
            .status(400)
            .json({success: false, message: "Недействительные учетные данные"})
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
        .json({success:false, error:"Ошибка Сервера(admin_login)"})
    }
}

exports.addCalculator =async (req,res) =>{
    try {
        const {title, number, description} = req.body;

        const newCalculator = await Calculator({title, number, description});
            await newCalculator.save();
            return res
                .status(200)
                .json({success:true, message: "Создан Новый Калькулятор"})
    } catch (error) {
        return res
        .status(500)
        .json({success:false, error:"Ошибка Сервера(admin_add)"})
    }
}



// Получение всех расчетов ипотеки
exports.getAllMortgageCalculations = async (req, res) => {
    try {
        const calculations = await Mortgage.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            success: true, 
            data: calculations 
        });
    } catch (error) {
        console.error("Error fetching mortgage calculations:", error);
        res.status(500).json({ 
            success: false, 
            error: "Ошибка при получении расчетов ипотеки" 
        });
    }
};




exports.exportMortgageCalculations = async (req, res) => {
    try {
        const calculations = await Mortgage.find()
            .sort({ createdAt: -1 })
            .lean();

        const fields = [
            { label: 'Сумма', value: 'amount' },
            { label: 'Первоначальный взнос', value: 'downPayment' },
            { label: 'Процентная ставка', value: 'interestRate' },
            { label: 'Срок кредита', value: 'loanTerm' },
            { label: 'Ежемесячный платеж', value: 'monthlyPayment' },
            { label: 'Общая сумма', value: 'totalPayable' },
            { label: 'Общие проценты', value: 'totalInterest' },
            { label: 'Необходимый доход', value: 'requiredIncome' },
            { 
                label: 'Дата создания', 
                value: (row) => new Date(row.createdAt).toLocaleString() 
            }
        ];

        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(calculations);

        res.header('Content-Type', 'text/csv');
        res.attachment('mortgage-calculations.csv');
        res.send(csv);

    } catch (error) {
        console.error("Export error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Ошибка при экспорте расчетов" 
        });
    }
};
