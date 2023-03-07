var Pool=require('pg').Pool
var pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'12345',
    port:5432

})
pool.connect(function(err:any) {
    if (err) throw err;
    console.log("Connected!");
  });
var express =require('express')
var app= express();
var port =2023

app.use(express.json())


//Getting all the data
app.get('/dataset1', async(req:any,res:any)=>{
    var aclient= await pool.query('select * from datasets;')
    res.send(aclient.rows)    
    }
)

//Getting data by id
app.get('/dataset1/get',async(req:any,res:any)=>{
    var id = parseInt(req.body.id)
    var gclient=await pool.query('select * from datasets where id = $1;',[id],(error:any, results:any) => {
        if (error) {
          throw error
        }
        res.json(results.rows)
      })
    })

//Inserting data
app.post('/dataset1/create', async(req:any,res:any)=>{
    var {id,data_schema,router_config,status,created_by,updated_by,created_dated,updated_date}=req.body
    await pool.query('INSERT INTO datasets values($1,$2,$3,$4,$5,$6,$7,$8);',
         [id,data_schema,router_config,status,created_by,updated_by,created_dated,updated_date],(error:any, result:any) => {
            if (error) {
              throw error
            }
            res.send(`new dataset is created `)
          })
        })
        
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

