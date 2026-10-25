
const express = require('express')
const connectDB = require('./config/db')
const app = express()
require('dotenv').config();
const cookieParser = require('cookie-parser')
const errorHandler = require("./middleware/errorHandler");

app.use(express.json())

connectDB();

const PORT = process.env.PORT || 5000;

const registerRouter = require('./routes/registerRoutes') ;
const authRouter = require('./routes/authRoutes');
const refreshRouter = require('./routes/refreshRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const categoryRouter = require("./routes/categoryRoutes");
const tagRouter = require('./routes/tagRoutes');
const verifyJWT = require('./middleware/verifyJWT');
const logoutRouter = require('./routes/logoutRoutes');

app.use(cookieParser());
app.use("/api/auth" , authRouter);
app.use("/api/register" , registerRouter);
app.use("/api/refresh" , refreshRouter);
app.use("/api/logout" , logoutRouter);
// protected routes 
app.use(verifyJWT);  
app.use("/api/users" , userRouter);
app.use("/api/categories" , categoryRouter);
app.use("/api/tags" , tagRouter);
app.use('/api/posts', postRouter);

// Handle unknown routes
app.use((req, res, next) => {
  const AppError = require("./utils/AppError");

  next(new AppError(
    `Route not found: ${req.method} ${req.originalUrl}`,
    404
  ));
});

// Error middleware must come last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






