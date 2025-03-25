const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },

},
{ timestamps: true })


module.exports = mongoose.model("Calculator", calculatorSchema);