var Pool=require('pg').Pool
var pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'12345',
    port:5432

})
import express, { Request, Response } from "express";
pool.connect(function(err:any) {
    if (err) throw err;
    console.log("Connected!");
  });
var getUsers = async(req:Request, res:Response) => {
  var aclient= await pool.query('select * from datasets;')
  if(aclient.rows.length===0){
    res.send({
      "status_code": 400,
      "reason_phrase": "Bad Request",
      "error_code": "Empty_table",
      "error_message": "Insert some data in the table"
    })
  }
  else{
  res.send(aclient.rows)    
  }
}
var getUserById =async(req:Request, res:Response)=>{
  var id = parseInt(req.params.id)
  
  var gclient=await pool.query('select * from datasets where id = $1;',[id],(error:any, results:any) => {
      if (results.rows.length===0) {
        res.send({"status_code": 404,
        "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
        "error_code": "Not_found",
        "error_message": "The data you requested could not be found in Database"})
      }
      else{
      res.json(results.rows)
}})
  }

  var createUser =async(req:Request, res:Response)=>
  {
      var {id,data_schema,router_config,status,created_by,updated_by,created_dated,updated_date}=req.body
      var cclient = await pool.query('INSERT INTO datasets values($1,$2,$3,$4,$5,$6,$7,$8);',
           [id,data_schema,router_config,status,created_by,updated_by,created_dated,updated_date],(error:any, result:any) => 
           {
              if (error) {
                res.send({
                  "status_code": 409,
        "reason_phrase": "The requested operation failed because it tried to create a resource that already exists.",
        "error_code": "duplicate",
        "error_message": "The data you posted already exists in the Database"})
                
              }
              res.send(req.body)
            })
  }
  
  var deleteUser = async(req:Request, res:Response)=>{
    var id = parseInt(req.params.id)
    var gclient=await pool.query(' delete from datasets where id = $1;',[id],(error:any, results:any) => {
      if (error) {
        res.send({"status_code": 404,
        "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
        "error_code": "Not_found",
        "error_message": "The data you requested could not be found in Database"})
      }
      else{
        res.send(`The record with ${id} is deleted`)
      }})
    }
module.exports={
  getUsers,
  getUserById,
  createUser,
  deleteUser
}