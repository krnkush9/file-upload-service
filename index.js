// modules
const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();

// port number
const PORT = process.env.PORT || 5000;

// files
const fileUploadRouter = require('./routes/fileUplaodRouter');
const authRouter = require('./routes/authRoute');
const { cloudinaryConnect } = require("./config/cloudinary");
const dbConnect = require('./config/database');

// database connection
dbConnect();
// cloudinary connect 
cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp'
}))


// routes
app.use('/api/v1/file', fileUploadRouter);
app.use('/api/v1/auth', authRouter);

// server start
app.listen(PORT, () => {
    console.log(`Server running port no. ${PORT}`);
})