const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const database = mongoose.connect('mongodb+srv://anniagg2003:annanay@restaurants.gy8porl.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})

module.exports = database;