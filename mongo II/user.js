const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    yearPublished: {
        type: Number,
        required: true,
    },
    genre: [String],
    availableCopies: {
        type: Number,
        default: 5,
    }
})

module.exports = mongoose.model("User", bookSchema)