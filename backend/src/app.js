require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const db = require('./database/db')


const port = process.env.PORT
const app = express()

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('src/uploads'))

app.use(userRouter)
app.use(postRouter)


db().then(() => {
    app.listen(port, () => console.log(`Server is running on port: ${port}`))
}).catch((err) => {
    console.log("Ocorreu um erro: " + err)
})

