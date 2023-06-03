const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    authorName: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    found: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Posts', postSchema)