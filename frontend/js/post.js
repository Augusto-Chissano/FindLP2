const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))


if (user.image) {
  document.getElementById('profile-log-picture').src = `http://localhost:3333/uploads/${user.image}`
  document.getElementById('nav-profile-img').src = `http://localhost:3333/uploads/${user.image}`
}



const profileName = document.getElementById('profile-name')
const publicar = document.querySelector(".publicar")

profileName.textContent = `${user.firstName} ${user.lastName}`

publicar.addEventListener("click", () => {
  window.location.href = "./create-post.html"
})

const postObject = JSON.parse(localStorage.getItem('postObject'))

const postImage = document.querySelector('#post-image')
const postAuthorImage = document.querySelector('#post-author-image')
const postAuthorName = document.querySelector('#post-author-name')
const postName = document.querySelector('#post-name')
const postDescription = document.querySelector('#post-description')
const mensagem = document.querySelector('#mensagem')

postImage.src = `http://localhost:3333/uploads/${postObject.image}`
postAuthorImage.src = `http://localhost:3333/uploads/${postObject.author.image}`
postAuthorName.innerHTML = `${postObject.author.firstName} ${postObject.author.lastName}`
postName.innerHTML = postObject.name
postDescription.innerHTML = postObject.description

mensagem.addEventListener('click', () => {
    abrirChatWhatsApp(postObject.author.phoneNumber)
})


function abrirChatWhatsApp(numeroCelular) {
    const numeroFormatado = numeroCelular.replace(/[^\d]/g, '')
    const url = `https://wa.me/+258${numeroFormatado}`
    window.open(url)
  }
  