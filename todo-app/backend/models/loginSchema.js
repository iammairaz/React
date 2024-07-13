const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Login", LoginSchema);