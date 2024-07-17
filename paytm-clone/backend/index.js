const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config");
const authRoutes = require("./src/routes/authRoute");
const accountRoutes = require("./src/routes/accountRoute");

const app = express();

connectDb();
app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes);
app.use("/account",accountRoutes);

app.listen(4000 , () => {
    console.log("Listening on port 4000")
})