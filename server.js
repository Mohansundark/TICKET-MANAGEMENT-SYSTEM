const express = require("express")
const indexRouter = require('./routes/index')
const app = express()
const eLayout = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
// database connectivity
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tms", {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))



app.use(eLayout)
app.use(express.static('public'))
app.use('/', indexRouter)
app.listen(process.env.PORT || 3000)