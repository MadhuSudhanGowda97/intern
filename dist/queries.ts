var Pool=require('pg').Pool
var pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'12345',
    port:5432,

})
var getusers=(req:any,res:any)=>{
    console.log("entered")
    
    pool.query('select * from users;'),(error:any, result:any) => {
        if (error) {
          throw error
        }
        res.json(result.rows)
      }
    }
    
var createuser= (req:any,res:any)=>{
    var{name,email}=req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error:any,res:any) => {
        if (error) {
          throw error
        }
        res.send(`User added with ID: ${res.insertId}`)
      })
}
module.exports={
    getusers,
    //createuser,
}