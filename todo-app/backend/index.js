const express = require('express');
const connectDB = require('./config/index');
const cors = require("cors");
const todoRoute = require('./routes/todoRoutes');

const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/api",todoRoute)

app.listen(4000,() => {
    console.log("listening on port 4000")
})