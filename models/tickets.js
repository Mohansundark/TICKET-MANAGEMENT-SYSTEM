const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    Client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"userSchema"
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now
    },
    description:{
        type: String,
        required:true
        
    }

})

module.exports = mongoose.model("Tickets",ticketSchema)
