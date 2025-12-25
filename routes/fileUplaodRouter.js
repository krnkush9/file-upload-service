const express = require("express");
const router = express.Router();

// middlewares
const { authMiddleware } = require('../middlewares/authMiddleware');
// constrollers
const { fileUpload } = require('../controllers/fileUpload');
const { viewAllFile } = require("../controllers/viewAllFile");
const { deleteFile } = require("../controllers/deleteFile");

// ########################################################
//                          Routers
// ########################################################
// file upload
router.post('/upload', authMiddleware, fileUpload);
// view all file
router.get('/getAllFiles', authMiddleware, viewAllFile)
// delete file
router.delete('/delete', authMiddleware, deleteFile)

// export
module.exports = router;