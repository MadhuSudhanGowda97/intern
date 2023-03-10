var express =require('express')
var app= express();
var port =2023
const db = require('./datasetqueries')
app.use(express.json())


//Getting all the data
app.get('/dataset1', db.getUsers)

//Getting data by id
app.get('/dataset1/get/:id',db.getUserById)

//Inserting data
app.post('/dataset1/create',db.createUser)

//Deleting data
app.delete('/dataset1/delete/:id',db.deleteUser)
        
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

