const mongoose = require("mongoose");

const mortgageSchema = new mongoose.Schema({
    
    amount: {
        type: Number,
        required: true,
    },
    downPayment: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    loanTerm: {
        type: Number,
        required: true,
    },
    monthlyPayment: {
        type: Number,
        required: true
    },
    totalPayable: {
        type: Number,
        required: true
    },
    totalInterest: {
        type: Number,
        required: true
    },
    requiredIncome: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true });

module.exports = mongoose.model("Mortgage", mortgageSchema);