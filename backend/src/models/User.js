const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
})

//Transformando o password em um hash antes de ser salvo na base de dados
userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified) {
        bcrypt.hash(this.password, 10,
            (err, hashedPassword) => {
                if (err)
                    next(err)
                else {
                    this.password = hashedPassword
                    next()
                }
            }
        )
    }
})

//Metodo para verificar o password criptografado
userSchema.methods.isCorrectPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err)
            cb(err)
        else {
            cb(err, same)
        }
    })
}

module.exports = mongoose.model('User', userSchema)