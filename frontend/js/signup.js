const baseURL = "http://localhost:3333"
const firstName = document.getElementById("firstname")
const lasttName = document.getElementById("lasttname")
const emailInput = document.getElementById("email")
const phoneNumber = document.getElementById("number")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confpassword")
const form = document.querySelector("#form")
const btnCriarConta = document.querySelector("#criar-conta")
const mensagem = document.getElementById("mensagem")
const modalContent = document.getElementById('modalContent')
const okButton = document.getElementById('okButton')


class User {
    constructor(firstName, lastName, email, phoneNumber, password, gender) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.password = password
        this.gender = gender
    }
}
const addUser = async (user) => {

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    const data = await response.json()

    if (data.email === user.email) {
        form.reset();
        mensagem.innerHTML = `Bem-vindo(a), ${data.firstName}! O seu cadastro foi realizado com sucesso com o e-mail ${data.email}.`
        card.classList.toggle("hide")
    }
}

const signUp = async (user) => {

    try {

        const response = await fetch(`${baseURL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            const data = await response.json()
            alert(data.error)
            throw new Error('Erro ao cadastrar')
        }

    } catch (error) {
        throw error
    }
}

const handleSignUp = async () => {

    const user = new User(firstName.value, lasttName.value, emailInput.value, phoneNumber.value, passwordInput.value, form.gender.value)

    try {
        const data = await signUp(user)

        form.reset()
        modalContent.classList.toggle('hide')
    } catch (error) {
        console.error('Erro durante o cadastro:', error)
    }
}


btnCriarConta.addEventListener("click", async (event) => {
    event.preventDefault()
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordInput.style.outlineColor = 'tomato'
        confirmPasswordInput.style.outlineColor = 'tomato'
    } else {
        event.preventDefault()
        await handleSignUp()
    }
})


okButton.addEventListener('click', () => {
    return window.location.href = 'index.html'
})


emailInput.addEventListener('blur', () => {
    if (!isEmail(emailInput.value)) {
        emailInput.style.outlineColor = 'tomato'
    }
})

emailInput.addEventListener('click', () => {
    emailInput.style.outlineColor = '#ccc'
})

confirmPasswordInput.addEventListener('click', () => {
    confirmPasswordInput.style.outlineColor = '#ccc'
})

passwordInput.addEventListener('click', () => {
    passwordInput.style.outlineColor = '#ccc'
})


function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
}


const inputs = document.querySelectorAll('input')

inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.style.outlineColor = 'tomato'
        }
    })
})

inputs.forEach((input) => {
    input.addEventListener('click', () => {
            input.style.outlineColor = '#ccc'
    })
})



