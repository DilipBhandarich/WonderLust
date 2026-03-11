const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMoongoose = require("passport-local-mongoose");

const userschema = new Schema({
    email:{
        type:String,
        required:true,
    }
})

userschema.plugin(passportLocalMoongoose);

module.exports = mongoose.model("User",userschema);