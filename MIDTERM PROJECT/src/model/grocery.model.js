const db= require(`../utils/database`)

module.exports = class Groceries{
    constructor(Item_name,Brand,Quantity,Comment){
        this.Item_name=Item_name;
        this.Brand=Brand;
        this.Quantity=Quantity;
        this.Comment = Comment;
    }

    save(callback) {
        const sql = "INSERT INTO groceries (Item_name,Brand,Quantity,Comment) VALUES (?, ?, ?,?)";
        const params = [this.Item_name, this.Brand, this.Quantity,this.Comment];
        db.run(sql, params, (err) => {
          if (err) callback(err);
          callback({ status: 200 });
        });
      }

    static find(callback) {
        const sql = "SELECT * FROM groceries ORDER BY Item_ID";
        db.all(sql, [], (err, rows) => {
          if (err) callback(err);
    
          callback({ status: 200, rows });
        });
    }

    static findById(id, callback) {
        const sql = "SELECT * FROM groceries WHERE Item_ID = ?";
        db.get(sql, id, (err, row) => {
          if (err) callback(err);
    
          callback({ status: 200, row });
        });
      }
    
    static updateOne(data, callback) {
        const sql =
          "UPDATE groceries SET Item_name = ?, Brand = ?, Quantity = ?, Comment = ? WHERE (Item_ID = ?)";
        const params = [data.Item_name, data.Brand,data.Quantity, data.Comment, data.id];
        db.run(sql, params, (err) => {
          if (err) callback(err);
          callback({ status: 200 });
        });
    }
    
    static deleteOne(id, callback) {
        const sql = "DELETE FROM groceries WHERE Item_ID = ?";
        db.run(sql, id, (err) => {
          if (err) callback(err);
          callback({ status: 200 });
        });
    }
 

}



