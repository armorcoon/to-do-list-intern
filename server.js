//using express
const express = require('express')
const app = express()


//use routes
const userRouter = require('./routes/users')
app.use("/index",userRouter)

//activate all static html pages 
app.use(express.static('public'))

app.listen('8000')