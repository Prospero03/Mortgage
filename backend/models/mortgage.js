const mongoose = require("mongoose");

const mortgageSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    downPayment:{
        type: Number,
        required: true,
    },
    interestRate:{
        type: Number,
        required: true,
    },
    loanTerm:{
        type: Number,
        required: true,
    },

    
},
{timestams: true})

module.exports = mongoose.model("mortgage", mortgageSchema)