const loginService = require("../services/loginService");

const signUp = async(req,res,next) => {
    try {
        const requestBody = req.body;
        const response = await loginService.signup(requestBody);
        if(response) {
            res.status(200).json({
                data:response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
}
const login = async(req,res,next) => {
    try {
        const requestBody = req.body;
        const response = await loginService.login(requestBody);
        if(response) {
            res.status(200).json({
                data:response
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
}

module.exports = {
    signUp:signUp,
    login: login
}