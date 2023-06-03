const router = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const Post = require('../models/Post')
const withAuth = require('../middlewares/auth')
const User = require('../models/User')


//Definindo como e onde serao armazenados os arquivos que vierem na requisicao
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.post('/posts', withAuth, upload.single('image'), async (req, res) => {

    const { name, age, date, gender, location, description } = req.body
    const image = req.file.filename
    const author = req.user._id
    const authorName = `${req.user.firstName} ${req.user.lastName}`

    let post = new Post({ name, age, date, gender, location, description, image, author, authorName })
    try {

        await post.save()
        res.status(200).send(post)

    } catch (error) {
        fs.unlinkSync(req.file.path)
        res.status(500).json({ error: 'Erro ao tentar publicar!' })
    }
})

router.get('/posts', withAuth, async (req, res) => {

    try {

        let posts = await Post.find().populate('author')
        
        return res.status(200).json(posts)

    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

router.put('/posts/:postId/delete', async (req, res) => {
    const postId = req.params.postId

    try {
        const post = await Post.findOne({ _id: postId })

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrada' })
        }

        post.deleted = true

        await post.save()

        res.json({ message: 'Post eliminada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao eliminar a postagem' })
    }
})

router.put('/posts/:postId/found', async (req, res) => {
    const postId = req.params.postId

    try {
        const post = await Post.findOne({ _id: postId })

        if (!post) {
            return res.status(404).json({ error: 'Postagem não encontrada' })
        }

        post.found = true

        await post.save()

        res.json({ message: 'Post actualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao tentar actualizar a postagem' })
    }
})

module.exports = router