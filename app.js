const express = require("express");
const middleware = require("./middleware")
const app = express();
const port = 3000|| process.env.port
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("./databse")
const session = require("express-session")

app.set("view engine","pug");
app.set("views","views")

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))

//routes
const loginroutes = require("./routes/loginroutes")
const registerroutes = require("./routes/registerroutes")
const logoutroutes = require("./routes/logoutroutes")


//api routes
const postapiroutes = require('./routes/api/posts')


app.use(session({
    secret: "annanay aggarwal",
    resave:true,
    saveUninitialized: false
}))

app.use("/login",loginroutes)
app.use("/Register",registerroutes)
app.use("/logout",logoutroutes)
app.use("/api/posts",postapiroutes)

app.get("/",middleware, (req,res,next)=>{

    var payload = {
        titlepage : "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home",payload)
})

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})