
const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
const modalContent = document.getElementById('modalContent')
const okButton = document.getElementById('okButton')

const profileName = document.getElementById('profile-name')
const postPreviewName = document.getElementById('post-preview-name')
profileName.textContent = `${user.firstName} ${user.lastName}`
postPreviewName.textContent = `${user.firstName} ${user.lastName}`


const inputFile = document.querySelector('.picture-input')
const picture = document.querySelector('.picture-image')
const formName = document.querySelector('#form-name')
const previewName = document.querySelector('#preview-name')
const previewPicture = document.querySelector('#preview-img')
const formDescription = document.querySelector('#form-description')
const previewDescription = document.querySelector('#preview-description')

//Preview Post
inputFile.addEventListener('change', function (e) {

    const inputTarget = e.target
    const file = inputTarget.files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function (e) {
        const readerTarget = e.target
        const img = document.createElement('img')
        img.src = reader.result
        previewPicture.style.backgroundImage = `url(${reader.result})`
        img.classList = "picture-image"

        picture.innerHTML = ""
        picture.appendChild(img)
    })

    reader.readAsDataURL(file)

})

formName.addEventListener("keyup", () => {
    previewName.innerHTML = formName.value
})

formDescription.addEventListener("keyup", () => {
    previewDescription.innerHTML = formDescription.value
})


const nameInput = document.querySelector('#form-name')
const gender = document.querySelector('#genero')
const age = document.querySelector('#form-age')
const date = document.querySelector('#form-date')
const locationInput = document.querySelector('#form-location')
const description = document.querySelector('#form-description')
const image = document.querySelector('#form-image')
const btnPost = document.querySelector('#btn-post')
const form = document.querySelector('form')

const addPost = async (post) => {

    try {

        const response = await fetch(`${baseURL}/posts`, {
            method: 'POST',
            headers: {
                "authorization": `${token}`
            },
            body: post
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
            throw new Error('Erro ao publicar')
        }

    } catch (error) {
        console.error('Erro ao publicar:', error)
        throw new Error('Erro ao publicar o post')
    }

}

const handleAddPost = async () => {

    const post = new FormData()
    post.append('name', nameInput.value)
    post.append('age', age.value)
    post.append('gender', gender.value)
    post.append('date', date.value)
    post.append('location', locationInput.value)
    post.append('description', description.value)
    post.append('image', image.files[0])

    try {
        const data = await addPost(post)
        form.reset()
        if (data) {
            return window.location.href = 'home.html'
            // modalContent.classList.toggle('hide')
        }
    } catch (error) {
        console.error('Erro na publicacao:', error)
    }
}

btnPost.addEventListener('click', async (event) => {
    event.preventDefault()
    const post = new FormData()
    post.append('name', nameInput.value)
    post.append('age', age.value)
    post.append('gender', gender.value)
    post.append('date', date.value)
    post.append('location', locationInput.value)
    post.append('description', description.value)
    post.append('image', image.files[0])

    await addPost(post)

})


okButton.addEventListener('click', (event) => { 
    return window.location.href = 'home.html'
})