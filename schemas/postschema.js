const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    content:{
        type:String,
        trim:true
    },
    postedby:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    pinned:{
        type:Boolean
    }
},{timestamps:true})

var post = mongoose.model('Post',PostSchema)

module.exports = post;