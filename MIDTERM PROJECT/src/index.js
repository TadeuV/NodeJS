const express = require(`express`);
const sessions=require(`express-session`)
const cookieParser=require(`cookie-parser`)
const methodOverride= require(`method-override`);
const path = require(`path`);
const bodyParser=require(`body-parser`);
require("dotenv").config();

const app = express();
const groceriesRouter=require(`./routers/routes`)
const Authentication=require(`./model/auth.model`)

app.use(express.static(path.join(__dirname,"..", "public")));
app.use('/static', express.static('./static'));
app.set("view engine", "ejs")
app.set("views","src/views")


app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride(`_method`))
app.use(cookieParser())

app.use(sessions({
    secret:"grocerAppAuth",
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:(24*60*60*1000)}
}))

app.get(`/`,(req,res)=>{
    res.render(`index`)
})

let session;

function aut (req,res,next){

}

app.get(`/login`,(req,res)=>{
    res.render(`login`)
})
app.post(`/login`,(req,res,next)=>{
    const user=req.body.username;
    const pass=req.body.password;

    if(user==="tadeuvieira" && pass==="1234"){
        session=req.session;
        session.userid=user;
        
        // next()
        // app.use(`/groceries`,groceriesRouter)
        res.redirect("/groceries/list")
    }
    else{
        res.send(`<h1>Wrong credentials</h1><br> <h2>click <a href="/login">here </a> to be redirect<h2>`)
        res.redirect("/");
    }
    // res.render(`login`)
})
app.get(`/logout`,(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.use(`/groceries`,groceriesRouter)

app.use((req,res)=>{
    res.render(__dirname+"/views/404.ejs");
})

// const container = document.querySelector('.container')
// container.addEventListener('animationend', () => {
//   container.classList.remove('active');
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))


