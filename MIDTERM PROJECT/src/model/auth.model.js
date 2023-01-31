const dbauth=require(`../utils/auth_db`)



module.exports = class Authentication{
    constructor(username,password){
        this.username = username
        this.password=password
    }

    save(callback) {
        const sql = "INSERT INTO authentication (username,password) VALUES (?, ?)";
        const params = [this.username,this.password];
        dbauth.run(sql, params, (err) => {
          if (err) callback(err);
          callback({ status: 200 });
        });
      }
}