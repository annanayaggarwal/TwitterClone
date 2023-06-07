const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("../schemas/user");
const bcrypt = require("bcrypt")

app.set("view engine","pug");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}));

router.get("/", (req,res,next)=>{
    res.status(200).render("login")
})

router.post("/", async(req,res,next)=>{
    const username = req.body.logUsername.trim()
    const email = req.body.logUsername.trim()

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword){
        var User = await user.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        .catch((err)=>{
            console.log(err);
            payload.errormsg = "something wrong";
            res.status(200).render("login",payload)
        })
        if(User!= null){
            var result = await bcrypt.compare(req.body.logPassword, User.Password)

            if(result == true){
                req.session.user = User
                return res.redirect("/");
            }
        }
        payload.errormsg = "Invalid Credentials";
        return res.status(200).render("login",payload)
    }
    payload.errormsg = "Fill all the fields properly";
    res.status(200).render("login",payload)
})

module.exports = router