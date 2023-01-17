const express = require(`express`);
const app = express();

const path = require(`path`);
const bodyParser = require(`body-parser`);


//have to install the env package to render the port from env
const port = process.env.PORT || 8005;

const filePath = path.join(__dirname,"/views/homepage.html")
app.use(bodyParser.urlencoded({extended:false}))
const guideRoutes = require('./routes/routes');

app.get(`/`,(req,res,next)=>{
    res.sendFile(filePath)
    // res.render(filePath, {port:port})
})

app.use(guideRoutes);

app.use((req,res,next)=>{
    res.sendFile(__dirname+"/views/404.html");
})


app.listen(port,()=>{
    console.log(`Server running port: ${port}`);
});