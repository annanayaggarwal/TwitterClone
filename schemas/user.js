const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    Password:{
        type:String
        // required:true
    },
    profilePic:{
        type:String,
        default:"/images/profilePic.png"
    }
},{timestamps:true})

var user = mongoose.model('User',userSchema)

module.exports = user;