//using express
const express = require('express')
const app = express()


//use routes
const userRouter = require('./routes/users')

app.use("/",userRouter)


app.listen('8000')