const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("../../schemas/user");
const post = require("../../schemas/postschema");

app.use(bodyParser.urlencoded({extended:false}));

router.get("/", (req,res,next)=>{
    
})

router.post("/", async(req,res,next)=>{
    if(!req.body.content){
        console.log("content params not send with request")
        return res.sendStatus(400)
    }
    var postdata ={
        content: req.body.content,
        postedby:req.session.user
    }
    post.create(postdata)
    .then(async(newpost)=>{
        newpost = await user.populate(newpost,{path:"postedby "})

        res.status(201).send(newpost)
    })
    .catch((err)=>{
        console.log(err)
        res.status(200).send("bad request")
    })
})
module.exports = router