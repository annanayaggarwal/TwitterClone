const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("../schemas/user");

app.set("view engine","pug");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}));

router.get("/", (req,res,next)=>{

    res.status(200).render("Register")
})

router.post("/", async(req,res,next)=>{
    const firstname = req.body.firstname.trim()
    const lastname = req.body.lastname.trim()
    const username = req.body.username.trim()
    const email = req.body.email.trim()
    const password = req.body.Password

    var payload = req.body;

    if(firstname && lastname && username && email && password){
        var User = await user.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        .catch((err)=>{
            console.log(err);
            payload.errormsg = "something wrong";
            res.status(200).render("Register",payload)
        })

        if(User == null){
            var data = req.body

            user.create(data)
            .then((User)=>{
                console.log(User);
            })
        }
        else{
            if(email == User.email){
                payload.errormsg = "email already exist";
                res.status(200).render("Register",payload)
            }
            else{
                payload.errormsg = "username already exist";
                res.status(200).render("Register",payload)
            }
        }
    }
    else{
        payload.errormsg = "make sure each fied has a required value";
        res.status(200).render("Register",payload)
    }
})

module.exports = router