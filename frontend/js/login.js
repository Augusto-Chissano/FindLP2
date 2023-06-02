const baseURL = "http://localhost:3333"
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const btnLogin = document.querySelector(".login-btn")

const login = async (email, password) => {

    try {
        const user = { email, password }
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            const data = await response.json();
            const { user, token } = data
            return { user, token }
        } else {
            const data = await response.json();
            return alert(data.error)
        }
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`)
        throw error
    }
}

const handleLogin = async () => {
    const email = emailInput.value
    const password = passwordInput.value

    try {
        const { user, token } = await login(email, password)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        //Redirecionamento para a tela principal
        return window.location.href = 'home.html'

    } catch (error) {
        console.error('Erro durante o login:', error)
       // emailInput.style.outlineColor = 'tomato'
       // passwordInput.style.outlineColor = 'tomato'
    }
}



btnLogin.addEventListener("click", async (event) => {

    event.preventDefault()
    await handleLogin()
})

emailInput.addEventListener('click', () => {
    emailInput.style.outlineColor = '#ccc'
})

passwordInput.addEventListener('click', () => {
    passwordInput.style.outlineColor = '#ccc'
})

emailInput.addEventListener('blur', () => {
    if (!isEmail(emailInput.value)) {
        emailInput.style.outlineColor = 'tomato'
    }
})

function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
}



