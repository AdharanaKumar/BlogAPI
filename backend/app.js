
const express = require('express')
const connectDB = require('./config/db')
const app = express()
require('dotenv').config();


app.use(express.json())

connectDB();

const PORT = process.env.PORT || 5000;

const authRouter = require('./routes/authRoutes')
const registerRouter = require('./routes/registerRoutes') 
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const categoryRouter = require("./routes/categoryRoutes")
const tagRouter = require("./routes/tagRoutes")

app.use("/api/auth" , authRouter);
app.use("/api/register" , registerRouter);
app.use("/api/users" , userRouter);
app.use("/api/categories" , categoryRouter);
app.use("/api/tags" , tagRouter);
app.use('/api/posts', postRouter);

// app.get( "/api",(req, res) => {res.json("hi ")})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});






