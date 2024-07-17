const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo DB connected ....")
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDb;