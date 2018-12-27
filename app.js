//load our app server using express somehow

const express=require('express')
const app=express()
const morgan=require('morgan')
const mysql=require('mysql')
const bodyParser=require('body-parser')

// Use some extra apps for help
app.use(express.static('./public'))
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))

// Use the routes that need to be there for user related stuff
const router = require('./routes/user.js')
app.use(router)

app.get("/",(req,res) =>{
  console.log("Responding to root route")
  res.send("Hello from root")
})

app.listen(3000, () => {
  console.log("server is up and listening on 3000...")
})
