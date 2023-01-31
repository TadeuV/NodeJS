const sqlite3=require(`sqlite3`).verbose();
const path=require(`path`);

const authdb = path.join(__dirname,"..","data","auth.db")
const dbauth = new sqlite3.Database(authdb, (err) => {
    if (err){
        console.log(err.message)
    }

    console.log("Sucessfully connected to Auth database.")
})

const sql_authcreate = `CREATE TABLE IF NOT EXISTS authentication(
    user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`

const sql_insert=`INSERT INTO authentication (user_id,username,password) VALUES 
    (1, "tadeuvieira", "1234")`


const seedDB=()=>{
    dbauth.serialize(()=>{
    
        dbauth.run(sql_authcreate,(err)=>{
            if(err) console.log(err.message)
        
            console.log("Table Auth created")
        })

        dbauth.run(sql_insert,(err)=>{
            if(err) console.log(err.message)

            console.log("Master user inserted")
        })
    })
}


dbauth.serialize(()=>{
    const sql_select = `SELECT name FROM sqlite_master WHERE type='table' AND name='authentication'`;
    dbauth.get(sql_select,[],(err,row)=>{
        if(err) {
            console.log(err.message)
        }else{
            if (row===undefined){
                console.log("Table Auth not found");
                seedDB();
            }else{
                console.log("Table Auth running")
            }
        }
    })
})

module.exports=dbauth;