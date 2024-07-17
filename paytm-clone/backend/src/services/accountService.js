const { default: mongoose } = require('mongoose');
const accountSchema = require("../models/accountSchema");

const getBalance = async(userId) => {
    const account = await accountSchema.findOne({userId});
    if(!account) {
        return {
            message: "Something went wrong while fetching balance"
        }
    }
    return account.balance
}

const transferMoney = async(reqObj) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,fromUserId,toUserId} = reqObj;

    const account = await accountSchema.findOne({userId:fromUserId}).session(session);
    if(!account || account.balance < amount) {
        await session.abortTransaction();
        throw new Error("Insufficient Balance");
    }
    const toAccount = await accountSchema.findOne({userId:toUserId}).session(session);
    if(!toAccount) {
        await session.abortTransaction();
        throw new Error("Invalid Account")
    }

    //perform transaction
    await accountSchema.updateOne({userId:fromUserId},{$inc:{balance:-amount}});
    await accountSchema.updateOne({userId:toUserId},{$inc:{balance:amount}});

    //commit transaction
    await session.commitTransaction();
    session.endSession()

    return {
        message: "Transfer Successfull"
    }
}

module.exports = {
    getBalance,
    transferMoney
}