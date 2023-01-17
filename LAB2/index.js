const http = require(`http`);
const server = http.createServer();
const fs = require(`fs`)
const path = require(`path`)

server.on(`request`,(req,resp) =>{
    // console.log(req.url)
    // console.log(req.method)
    // console.log(resp)



    // if (req.url ==="/"){
    //     resp.statusCode=200;
    //     resp.setHeader("Content-Type", "text/html")
    //     resp.end("<h1> Hello Node!</h1> \n <p><a>http://localhost:8000/read-message</a></p> <p><a>http://localhost:8000/write-message</a></p>")
    // }

    // if (req.url ==="/read-message"){
    //     resp.statusCode=200;
    //     resp.setHeader("Content-Type", "text/html")
    //     resp.end("<h1> This is other page!</h1>")
    // }
    // if (req.url ==="/write-message"){
    //     resp.statusCode=200;
    //     resp.setHeader("Content-Type", "text/html")
    //     resp.end(`
    //         <html>
    //             <head>
    //                 <title>Write your message</title>
    //             </head>
    //             <body>
    //                 <p>Write your message below:</p>
    //                 <form action="/msg" method="POST">
    //                     <input type="text" name="message" placeholder="Enter your message">
    //                     <button type="submit">Submit</button>
    //                 </form>
    //             </body>
    //         </html>
    //         `)
    // }

    switch (req.url) {
        case "/":
            resp.statusCode=200;
            resp.setHeader("Content-Type", "text/html")
            resp.end("<h1> Hello Node!</h1> \n <p><a>http://localhost:8000/read-message</a></p> <p><a>http://localhost:8000/write-message</a></p>")
            break
        case "/read-message":
            resp.statusCode=200;
            resp.setHeader("Content-Type", "text/html")

            const filePath = path.join(__dirname,"message.txt")
            fs.readFile(filePath,(err,content)=>{
                if (err){
                    if(err.code ==="ENOENT"){
                        resp.end("<h1>File wasn`t found!</h1>")
                    }
                }   
                else{
                    resp.writeHead(200, "Content-Type", "text/html");
                    resp.end(content,"utf8");
                }

            })
            break
        case "/write-message":
            resp.statusCode=200;
            resp.setHeader("Content-Type", "text/html")
            resp.write(`
            <html>
                <head>
                    <title>Write your message</title>
                </head>
                <body>
                    <form action="/write-message" method="POST">
                        <input type="text" name="message" placeholder="Enter your message">
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
            `)

            const body = [];

            req.on(`data`, (chunk)=>{
                body.push(chunk)
            })

            req.on(`end`, () =>{
                const parsedBody = Buffer.concat(body).toString();
                const msg = parsedBody.split("=")[1];
                fs.writeFile(`message.txt`,msg, (err)=>{
                    if(err) throw err;
                    resp.statusCode=302;
                    // resp.setHeader(`Location`, `/`);
                    return resp.end();
                })
                
            })

            break
        
        default:
            resp.statusCode=400;
            resp.setHeader("Content-Type", "text/html")
            resp.end("<h1> Something went wrong!</h1>")
            break
    
    }
    
});

server.listen(8000, ()=>{
    console.log("Port chosen 8000")
})
