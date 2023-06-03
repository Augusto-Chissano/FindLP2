const inputFile = document.querySelector('.picture-input')
const picture = document.querySelector('.picture-image')
const token = localStorage.getItem('token')
const logUser = JSON.parse(localStorage.getItem('user'))

console.log(logUser)
const baseURL = "http://localhost:3333"
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lasttname")
const emailInput = document.getElementById("email")
const phoneNumber = document.getElementById("number")
const form = document.querySelector("#form")
const btnEditarConta = document.querySelector("#criar-conta")
const mensagem = document.getElementById("mensagem")
const modalContent = document.getElementById('modalContent')
const okButton = document.getElementById('okButton')
const image = document.querySelector('#form-image')

firstName.value = logUser.firstName

lastName.value = logUser.lastName
emailInput.value = logUser.email
phoneNumber.value = logUser.phoneNumber

inputFile.addEventListener('change', function (e) {

    const inputTarget = e.target
    const file = inputTarget.files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function (e) {
        const readerTarget = e.target
        const img = document.createElement('img')
        img.src = reader.result
        img.classList = "picture-image"

        picture.innerHTML = ""
        picture.appendChild(img)
    })

    reader.readAsDataURL(file)

})

const updateUser = async (user) => {

    try {

        const response = await fetch(`${baseURL}/user/${logUser._id}`, {
            method: 'PUT',
            headers: {
                "authorization": `${token}`
            },
            body: user
        })

        if (response.ok) {
            const data = await response.json()
            if (data) {
                form.reset()
                modalContent.classList.toggle('hide')
            }

        } else {
            const data = await response.json()
            console.log(data.error);
            throw new Error('Erro ao actualizar dados')
        }

    } catch (error) {
        console.error('Erro ao actualizar dados:', error)
        throw new Error('Erro ao actualizar dados')
    }
}

btnEditarConta.addEventListener('click', async (event) => {

    event.preventDefault()
    const user = new FormData()
    user.append('firstName', firstName.value)
    user.append('lastName', lastName.value)
    user.append('email', emailInput.value)
    user.append('image', image.files[0])

    await updateUser(user)

})

okButton.addEventListener('click', () => { 
    return window.location.href = 'home.html'
})


