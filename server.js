// IMPORTS
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const eLayout = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const ticketRouter = require('./routes/tickets')
const userRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

// set
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// database connectivity
const mongoose = require('mongoose')
const user = require('./models/users')
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

//using the imports
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))
app.use(bodyParser.json())
app.use(eLayout)
app.use(express.static('public'))

// routers
app.use('/', indexRouter)
app.use('/tickets', ticketRouter)
app.use('/users', userRouter)
app.use('/admin',adminRouter)

app.listen(process.env.PORT || 3000)