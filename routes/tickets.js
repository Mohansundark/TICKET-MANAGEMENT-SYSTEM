const express = require('express');
const router = express.Router()

// All tickets
router.get('/', (req, res) => {
    res.render('tickets/index')
})

// new ticket route
router.get('/new', (req, res) => {
    res.render('tickets/new')
})

// create ticket
router.post('/', (req, res) => {
    res.send('Create')
})


module.exports = router