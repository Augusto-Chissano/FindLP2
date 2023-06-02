require('dotenv').config
const mongoose = require("mongoose")

// #1-Cloud database config
const user = process.env.DB_USER
const pass = process.env.DB_PASSWORD

//const db = () => mongoose.connect(`mongodb+srv://${user}:${pass}@findlp.uik7ii3.mongodb.net/?retryWrites=true&w=majority`)

// #2-Localhost databse
const db = () => mongoose.connect("mongodb://localhost/findlp")

module.exports = db
