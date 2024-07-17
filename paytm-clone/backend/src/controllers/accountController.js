const accountService = require("../services/accountService");

const getBalance = async(req,res,next) => {
    try {
        const userId = req.params.userId;
        const response = await accountService.getBalance(userId);
        if(response) {
            res.status(200).json({
                message: "Success",
                data : response
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status : 400,
            error: error.message
        })
    }
}
const transferMoney = async(req,res,next) => {
    try {
        const requestBody = req.body;
        const response = await accountService.transferMoney(requestBody);
        if(response) {
            res.status(200).json({
                message: "Transfer Success",
                data : response
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status : 400,
            error: error.message
        })
    }
}

module.exports = {
    getBalance,
    transferMoney
}