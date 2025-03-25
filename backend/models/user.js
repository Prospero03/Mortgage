const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required:true,
            unique:true,
        },
        username: {
            type:String,
            required:true,
            unique:true,
        },
        password: {
            type:String,
            required:true,
            unique:true,
        },
        role: {
            type:String,
            required:true,
            default: "user",
            enum: ["user", "admin"],
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("user", userSchema);