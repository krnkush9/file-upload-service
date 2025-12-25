// model
const fileModel = require('../models/fileModel');

// view all file controller
exports.viewAllFile = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;
        // get all file from database
        const allFile = await fileModel.find({userId});
        // validation
        if (allFile.length == 0) {
            return res.status(200).json({
                success: false,
                total_file: 0,
                message: "File not found"
            })
        }
        // store all file in a array
        let fileList = [], index = 1;
        // for loop
        for (let file of allFile) {
            let obj = {
                [index]: file.file_url
            }
            // store all file in the fileList array
            fileList.push(obj);
            index++
        }
        // send response
        res.status(200).json({
            success: true,
            total_file: allFile.length,
            all_file_url: fileList
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error. Can't view all file",
            error: err.message
        })
    }
}