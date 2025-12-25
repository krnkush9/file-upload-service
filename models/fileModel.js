const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    file_url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Files", fileSchema);