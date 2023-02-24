const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
})


const bookModel = mongoose.model("book", bookSchema)

module.exports = bookModel