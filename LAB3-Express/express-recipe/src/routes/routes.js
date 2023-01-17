const express = require(`express`);
const path = require(`path`)
const router = express.Router();
const fs = require(`fs`);

router.get("/wrnote",(req,res,next)=>{
    const formPath=path.join(__dirname,`../`,`/views/noteform.html`)
    res.sendFile(formPath)
})


router.post("/wrnote",(req,res,next)=>{
    const {message} = req.body;

    fs.appendFile(`message.txt`,(`\n`+message),(err,content)=>{
        if(err){
            throw err;
        }else{
            console.log("sent")
            res.redirect("/")
        }
    })
    
})

router.get("/note",(req,res,next)=>{
    // console.log(path.join(__dirname,`../`,`../`,`message.txt`));
    const textPath = path.join(__dirname,`../`,`../`,`../`,`message.txt`)
    fs.readFile((textPath),(err,content)=>{
        if(err){
            if(err.code ==="ENOENT"){
                res.end("<h1>File wasn`t found!</h1>")
            }
        }else{
            res.writeHead(200, "Content-Type", "text/html");
            res.end(content,"utf8");
        }
    })
})

module.exports =router;