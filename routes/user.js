//Will contain all /user related routes

const express = require('express')
const mysql = require('mysql')
const router = express.Router()


// Route for /messages
router.get('/messages', (req, res) => {
    console.log("DEBUG: Show me some messages")
    res.end()
})

// Router for /users
router.get('/users', (req,res) => {
    console.log("DEBUG: Fetching user with id: "+req.params.id)
    // Connect to MySQL server
    const connection = getConnection()
    
    const userid=req.params.id
    const queryString="select * from users"
    connection.query(queryString, (err,rows,fields)=>{
      if (err){
        console.log("Failed to query for users: "+ err)
        res.sendStatus(500)
        return
      }
  
      //console.log("DEBUG: I think we fetched a user")
    
      const users=rows.map((row)=>{
        return{Firstname: row.first_name,Lastname: row.last_name}
  
      })
      
      res.json(users)
    })
  
    //res.end()
})

router.post('/user_create',(req,res)=>{
    console.log("Trying to create a user...")
    console.log("How do we get the form data...")

    const firstName=req.body.create_first_name
    const lastName=req.body.create_last_name

    const queryString =" INSERT INTO users (first_name, last_name) values (?,?)"
    getConnection().query(queryString, [firstName,lastName],(err, results,fields)=>{
        if(err){
        console.log("DEBUG: Failed to insert new user: "+err)
        res.sendStatus(500)
        return
        }

        console.log("DEBUG: Inserted a new user with id: ",results.insertId);
        res.end()
    })
    res.end()
})

router.get('/users/:id', (req,res) => {
console.log("Fetching user with id: "+req.params.id)

const connection = getConnection() 

const userid=req.params.id
const queryString="select * from users where id= ?"
connection.query(queryString,[userid], (err,rows,fields)=>{
    if (err){
    console.log("Failed to query for users: "+ err)
    res.sendStatus(500)
    return
    }

    console.log("I think we fetched a user")

    const users=rows.map((row)=>{
    return{Firstname: row.first_name,Lastname: row.last_name}

    })
    
    res.json(users)
})
})

router.get("/users", (req,res)=>{
const user1={firstname: "Stephen", Lastname: "Curry"}
const user2={firstname: "Kevin", Lastname: "Durant"}
res.json([user1,user2])

// res.send("Nodemon auto updates when I save this file")
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'nutanix/4u',
    database: 'lbta_mysql'
})

// Functions that we are going to use
function getConnection() {
    return pool 
}

module.exports = router