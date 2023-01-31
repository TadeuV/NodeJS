const Groceries = require(`../model/grocery.model`)


exports.getAllGroceries = (req,res) =>{
    Groceries.find((data) =>{
        if(data.status === 200){
            return res.render("groceries", { model: data.rows, totQuant:data.rows.reduce((acc,cur)=>{
                return acc+=cur.Quantity
            },0) });
        }
    
        console.error(data.message)
    })
}

exports.getInsertGrocery = (req, res) => {
    res.render("insert", { model: {} });
  }
  
  exports.postInsertGrocery = (req, res) => {
    const { Item_name, Brand,Quantity, Comment } = req.body;
  
    const newGrocery = new Groceries(Item_name, Brand,Quantity, Comment);
    newGrocery.save((data) => {
      if(data.status === 200){
          return res.redirect("/groceries/list");
      }
  
      console.error(data.message)
    })
  }
  
  exports.getEditGroceryById = (req, res) => {
    const id = req.params.id;
    Groceries.findById(id,(data) =>{
        if(data.status === 200){
            return res.render("editform", { model: data.row });
        }
        console.error(data.message)
      

    })
  };
  
  exports.postEditGroceryById = (req, res) => {
    const id = req.params.id;
    const {  Item_name, Brand,Quantity, Comment } = req.body;
  
    const dataToUpdate = { id,  Item_name, Brand,Quantity, Comment };
  
    Groceries.updateOne(dataToUpdate,(data)=>{
        if(data.status === 200){
            return res.redirect("/groceries/list");
        }
        console.error(data.message)
    })
  };
  
  exports.deleteGrocery = (req, res) => {
    const id = req.params.id;
  
    Groceries.deleteOne(id,(data)=>{
        if(data.status === 200){
            return res.redirect("/groceries/list");
        }
        console.error(data.message)
    })
  };
  