
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
require("dotenv").config()

const MONGU_URL = process.env.MONGU_URL 


const dbConnect  =  async function () {
    try {
    const res =  await mongoose.connect(MONGU_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true
    })
    if(res){
        return res
    }
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports = dbConnect