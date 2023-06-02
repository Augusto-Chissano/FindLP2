require('dotenv').config()
const router = require("express").Router()
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY


router.post("/users/signup", async (req, res) => {

    const { firstName, lastName, email, phoneNumber, password, gender } = req.body

    try {
        if (!firstName || !lastName || !email || !phoneNumber || !password || !gender) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' })
        }
        const verificar = await User.findOne({ email: email })

        if (verificar) {
            return res.status(400).json({ error: 'Email já em uso' })
        }

        let user = new User({ firstName, lastName, email, phoneNumber, password, gender })
        await user.save()

        return res.status(201).json(user)

    } catch (err) {
        return res.status(500).send({ error: 'Internal error, please try agian' })
    }
})

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({ error: 'Por favor, preencha todos os campos.' })
        }

        let user = await User.findOne({ email: email })

        if (!user) {
            res.status(401).json({ error: 'Incorrect email or password' })
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (!same) {
                    res.status(401).json({ error: 'Incorrect password or email' })
                } else {
                    const token = jwt.sign({ email }, secret, { expiresIn: '10d' })
                    res.json({ user: user, token: token })
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal error, please try again' })
    }
})

router.get("/user/:id", async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.params.id })

        return res.status(200).json(user);
    } catch (err) {
        return res.status(404).send({ error: "Não foi possível obter dados!" })
    }
})


router.get("/user", async (req, res) => {
    try {
        let users = await User.find()

        return res.status(200).json(users)
    } catch (err) {
        return res.status(404).send({ error: "Não foi possível obter dados!" })
    }
})

router.put("/user/:username", async (req, res) => {
    try {

        let username = req.params.username;
        let user = await User.findOne({ username: username })

        user.username = req.body.username
        user.password = req.body.password

        await user.updateOne(user)
        await user.save()
        return res.status(200).json(user)

    } catch (err) {
        return res.status(400).send({ error: 'Não foi possível editar os dados' })
    }
})


router.delete("/user/:username", async (req, res) => {
    try {

        const username = req.params.username
        const user = await User.findOne({ username: username })

        user.status = false

        await user.updateOne(user)
        await user.save()
        res.status(200).json(user)

    } catch (err) {
        return res.status(400).send({ error: 'Não foi possível eliminar o user' })
    }
});


module.exports = router