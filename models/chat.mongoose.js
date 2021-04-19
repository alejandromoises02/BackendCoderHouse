
const mongoose = require('mongoose')

const chatCollection = 'chat'

const ChatSchema = new mongoose.Schema({
    from: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    msg: { type: String, required: true, max: 70 },
    date: { type: String, required: true, max: 70 },
})

module.exports = mongoose.model(chatCollection, ChatSchema)



