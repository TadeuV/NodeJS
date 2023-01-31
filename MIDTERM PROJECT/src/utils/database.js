const sqlite3=require(`sqlite3`).verbose();
const path=require(`path`);

const db_groceries = path.join(__dirname,"..","data","app.db")
const db = new sqlite3.Database(db_groceries, (err) => {
    if (err){
        console.log(err.message)
    }

    console.log("Sucessfully connected to the database.")
})

const sql_create = `CREATE TABLE IF NOT EXISTS groceries(
    Item_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Item_name VARCHAR(100) NOT NULL,
    Brand VARCHAR(100) NOT NULL,
    Quantity INTEGER DEFAULT 1,
    Comment TEXT
)`

const sql_test=`INSERT INTO groceries (Item_ID,Item_name,Brand,Quantity,Comment) VALUES 
    (1, "Biscuit", "Dare", 1, "Coconut Flavor at Walmart for 5$")`

const seedDB=()=>{
    db.serialize(()=>{
    
        db.run(sql_create,(err)=>{
            if(err) console.log(err.message)
        
            console.log("Table created")
        })

        db.run(sql_test,(err)=>{
            if(err) console.log(err.message)

            console.log("Row inserted")
        })
    })
}

db.serialize(()=>{
    const sql_select = `SELECT name FROM sqlite_master WHERE type='table' AND name='groceries'`;
    db.get(sql_select,[],(err,row)=>{
        if(err) {
            console.log(err.message)
        }else{
            if (row===undefined){
                console.log("Table not found");
                seedDB();
            }else{
                console.log("Table found and working")
            }
        }
    })
})

module.exports=db;