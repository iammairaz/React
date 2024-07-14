const loginService = require("../services/loginService");

const signUp = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const response = await loginService.signup(requestBody);
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message :"Signup Successfull"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            status: 404,
            error: error.message
        })
    }
}
const login = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const response = await loginService.login(requestBody);
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message:"Login Successfull"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            status: 404,
            error: error.message
        })
    }
}

module.exports = {
    signUp: signUp,
    login: login
}