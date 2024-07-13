const loginSchema = require("../models/loginSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (reqObj) => {
    const { name, password, mobileNo, email } = reqObj;

    const isUserExists = await loginSchema.findOne({ name: name, mobileNo: mobileNo });
    if (isUserExists) {
        throw new Error("User already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new loginSchema({
        name:name,
        password:hashedPassword,
        mobileNo:mobileNo,
        email:email
    })
    newUser.save();
    const token = jwt.sign({ userName: name }, "Veeru", { expiresIn: '1h' });

    return token;
}

const login = async(reqObj) => {
    const {name,password} = reqObj;
    const user = await loginSchema.findOne({name});
    if(!user) {
        throw new Error("User not Found");
    }

    const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign({userName:name},"Veeru",{expiresIn:"1h"});
    return token;

}

module.exports = {
    signup: signup,
    login: login
}