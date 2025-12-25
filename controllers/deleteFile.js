// schema
const fileModel = require('../models/fileModel');

exports.deleteFile = async (req, res) => {
    try {
        // fetch file
        const { fileUrl } = req.body;
        // validation
        if (!fileUrl) {
            return res.status(400).json({
                success: false,
                message: "Bad request. File url required"
            })
        }
        // fetch user id
        const userId = req.user.id;
        // get file
        const getFile = await fileModel.find({
            $and: [
                { userId: userId },
                { file_url: fileUrl }
            ]
        })
        // validation
        if (getFile.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Bad request. File not found"
            })
        }
        // delete file from database
        const deleteFile = await fileModel.findOneAndDelete({
            $and: [
                { userId: userId },
                { file_url: fileUrl }
            ]
        })
        // validation
        if (deleteFile == null) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error. File is not deleted"
            })
        }
        // send response
        return res.status(200).json({
            success: true,
            message: "File deleted"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while delete file"
        })
    }
}