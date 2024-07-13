const express = require('express');
const connectDB = require('./config/index');
const cors = require("cors");
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes);
app.use("/api",todoRoutes);

app.listen(4000,() => {
    console.log("listening on port 4000")
})