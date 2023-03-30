// Require dotenv to setup environment variables in our server
require('dotenv').config()

//load express
const express = require('express')
const cors = require('cors')

//create app and setup express
const app = express()
const PORT = 8080

//require connectDB function
const connectDB = require('./config/db')

//connect to DB
connectDB()

//require routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const trailRoutes = require('./routes/trailRoutes')
const commentRoutes = require('./routes/commentRoutes.js')

const {authorize} = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/users', authorize, userRoutes)
app.use('/auth', authRoutes)
app.use('/trails', trailRoutes)
app.use('/comments/:id', commentRoutes)


//Listen to given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})