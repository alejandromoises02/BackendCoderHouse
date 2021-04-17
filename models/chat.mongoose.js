const mongoose = require("mongoose");

const chatCollection = "chat";

const ChatSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    edad: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    avatar: { type: String, required: true, max: 50 },
  },
  text: { type: String, required: true, max: 70 },
  date: { type: String, required: true, max: 70 },
});

module.exports = mongoose.model(chatCollection, ChatSchema);
