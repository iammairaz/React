const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const accountSchema = require("../models/accountSchema");

const signup = async (reqObj) => {
    const { firstName, lastName, password, mobileNo, email } = reqObj;

    const isUserExists = await userSchema.findOne({ email: email, mobileNo: mobileNo });
    if (isUserExists) {
        throw new Error("User already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        mobileNo: mobileNo,
        email: email
    })
    const userId = newUser._id;
    await accountSchema.create({
        userId,
        balance : 1 + Math.random()*1000
    })
    const token = jwt.sign({ firstName: firstName, lastName: lastName }, JWT_SECRET, { expiresIn: '1h' });

    return token;
}

const login = async (reqObj) => {
    const { mobileNo, password } = reqObj;
    const user = await userSchema.findOne({ mobileNo: mobileNo });
    if (!user) {
        throw new Error("User not Found");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign({ firstName: user.firstName, lastName: user.lastName }, JWT_SECRET, { expiresIn: "1h" });
    return token;

}

const updateUserDetails = async (reqObj) => {
    const { firstName, lastName, password, mobileNo } = reqObj;
    const user = await userSchema.findOne({ mobileNo });

    const updateObj = {}

    if (!user) {
        throw new Error("User not Found")
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateObj.password = hashedPassword;
    }
    if (firstName !== user.firstName) {
        updateObj.firstName = firstName;
    }
    if (lastName !== user.lastName) {
        updateObj.lastName = lastName;
    }

    const result = await userSchema.findOneAndUpdate({ mobileNo }, updateObj, { new: true });
    if (result) {
        return result;
    }

}

const getUsers = async(reqObj) => {
    const users = await userSchema.find({},{password:0}).lean();
    if(users) {
        return users
    }
}

module.exports = {
    signup: signup,
    login: login,
    updateUserDetails: updateUserDetails,
    getUsers
}