const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: String,
    age:Number
})


const authorModel = mongoose.model("author", authorSchema)

module.exports = authorModel