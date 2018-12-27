//load our app server using express somehow

const express=require('express')
const app=express()
const morgan=require('morgan')
const mysql=require('mysql')

app.use(morgan('combined'))

app.get('/users/:id', (req,res) => {
  console.log("Fetching user with id: "+req.params.id)
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nutanix/4u',
    database: 'lbta_mysql'
  })  
  
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

  //res.end()
})

app.get("/",(req,res) =>{
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

app.get("/users", (req,res)=>{
  const user1={firstname: "Stephen", Lastname: "Curry"}
  const user2={firstname: "Kevin", Lastname: "Durant"}
  res.json([user1,user2])

  // res.send("Nodemon auto updates when I save this file")
})

app.listen(3000, () => {
  console.log("server is up and listening on 3000...")
})
