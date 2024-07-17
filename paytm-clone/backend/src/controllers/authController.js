const authService = require("../services/authService");

const signUp = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const response = await authService.signup(requestBody);
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message: "Signup Successfull"
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
        const response = await authService.login(requestBody);
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message: "Login Successfull"
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

const updateUserDetails = async (req, res, next) => {
    try {
        const requestBody = req.body;
        const mobileNo = req.params.mobileNo;
        requestBody.mobileNo = +mobileNo;
        const response = await authService.updateUserDetails(requestBody);
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message: "Update Successfull"
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

const getUsers = async (req, res, next) => {
    try {
        const response = await authService.getUsers();
        if (response) {
            res.status(200).json({
                status: 200,
                data: response,
                message: "Success"
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
    login: login,
    updateUserDetails: updateUserDetails,
    getUsers
}