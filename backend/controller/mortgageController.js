const modelMortgage = require("../models/mortgage")

exports.mortgageSave = async (req,res) =>{
    try {
        const {amount, downPayment, interestRate, loanTerm, monthlyPayment, totalPayable, totalInterest, requiredIncome} = req.body;

    //if( !amount || !downPayment || !interestRate || !loanTerm ){
    //    return res
    //    .status(400)
    //    .json({success:false, message:"Введены не все данные"});
    //}

    const newMortgage = new modelMortgage({amount, downPayment, interestRate, loanTerm, monthlyPayment, totalPayable, totalInterest, requiredIncome});
    await newMortgage.save();
    return res
        .status(200)
        .json({success:true, message: "Данные внесены в базу данных"})

    } catch (error) {
        return res
        .status(400)
        .json({success:false, error:"Ошибка Сервера"})
    }
    
}