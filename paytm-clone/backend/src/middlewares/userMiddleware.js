const zod = require("zod");

const signUpBody = zod.object({
    firstName : zod.string().min(1).max(10),
    lastName : zod.string().min(1).max(10),
    mobileNo : zod.number(),
    password : zod.string().min(5)
})

const loginBody = zod.object({
    mobileNo : zod.number(),
    password : zod.string().min(5)
})
const userSignupMiddleware = (req,res,next) => {
    const {success} = signUpBody.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            status : 400,
            message : "Please provide valid inputs"
        })
    }else {
        next()
    }
}

const userLoginMiddleware = (req,res,next) => {
    const {success} = loginBody.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            status: 400,
            message : "Please enter valid inputs"
        })
    }else {
        next()
    }
}

module.exports = {
    userSignupMiddleware,
    userLoginMiddleware
}