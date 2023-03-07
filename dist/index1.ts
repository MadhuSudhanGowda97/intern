var Pool=require('pg').Pool
var pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'12345',
    port:5432,

})


var express=require('express')
var app = express();
var port =3000;
//var db= require('./queries')
app.use(express.json())

 app.get('/',(req:any,res:any)=>{
    res.json({info:'express and postgre api'})
 })
 //console.log(`entered`);
 app.get('/user',async(req:any,res:any)=>{
    console.log("entered")
    
    var client=await pool.query('select * from users;')
    console.log(client.rows);
    res.send(client.rows)    
    }

 )
 app.post('/users',async(req:any,res:any)=>{
    var{name,email,full_name,date_time}=req.body;
    await pool.query('INSERT INTO users (name, email,full_name,date_time) VALUES ($1, $2,$3,$4);',[name, email,full_name,date_time])
        res.send(`User added`)
      })
 app.listen(port,()=>{
    console.log(`app running on ${port}`);
    
 })