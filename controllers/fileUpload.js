// package
const cloudinary = require('cloudinary');
// files
const fileModel = require('../models/fileModel');

// isFileSupportedType()- check file format support or not
function isFileSupportedType(fileType) {
    const supportedType = ["png", "jpeg", "jpg"];
    return supportedType.includes(fileType);
}

// util function for upload
async function uploadToCloudinary(file, folder) {
    // folder name of cloudinary
    const options = { folder: folder };
    // call upload method 
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

// file upload controller
exports.fileUpload = async (req, res) => {
    try {
        // get file type     
        if(!req.files) {
            return res.status(400).json({
                success: false,
                message: "File not found"
            })
        }
        // fetch file
        const file = req.files.file;
        // get user id
        const userId = req.user.id;
        const fileType = file.name.split('.')[1].toLowerCase();
        // validate file type (extension)
        if (!isFileSupportedType(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }
        // call cloudinary upload method
        const result = await uploadToCloudinary(file, "uploads");
        // sava data in database
        await fileModel.create({
            userId,
            file_url: result.secure_url
        })
        // send response
        return res.status(200).json({
            success: true,
            message: "File uploaded",
            file_url: result.secure_url
        })
    } catch (error) {
        // send error
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        })
    }
}