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

function fetchPosts() {
  fetch(`${baseURL}/posts`, {
    headers: {
      'authorization': token
    }
  })
    .then(response => response.json())
    .then(posts => {
      renderPosts(posts)
    })
    .catch(error => {
      console.error('Erro ao buscar postagens:', error)
    })
}

fetchPosts()

function renderPosts(posts) {
  const container = document.querySelector('.post-container')
  console.log(posts)
  container.innerHTML = ''

  posts.forEach((post) => {
    console.log(post.author.image)

    const card = document.createElement('div')
    card.classList.add('post-card')

    card.innerHTML = `
        <div class="author">
          <img src="${baseURL}/uploads/${post.author.image}" alt="Imagem do autor">
          <span class="author-name">${post.authorName}</span>
        </div>
        <div class="post-info">
          <span class="post-date">${post.date.slice(0, 10)}</span>
          <p class="post-description">${post.description}</p>
          <img src= "${baseURL}/uploads/${post.image}" class="post-image" alt="Imagem da publicação">
          <div class="post-actions">
            <button title="like" class="like-button">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button title="share" class="share-button" data-post='${JSON.stringify(post)}'>
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      `
    const shareButtons = card.querySelectorAll('.share-button')
    shareButtons.forEach((button) => {
      button.addEventListener('click', () => {

        const postObject = JSON.parse(button.dataset.post)
        localStorage.setItem('postObject', button.dataset.post)

        const shareCard = document.querySelector('.share-card')
        const shareImage = document.querySelector('.share-image')
        shareImage.src = `http://localhost:3333/uploads/${postObject.image}`
        shareCard.classList.remove('hide')
      })
    })

    const postImages = card.querySelectorAll('.post-image')
    postImages.forEach((image) => {
      image.addEventListener('click', () => {
        return window.location.href = 'post.html'
      })
    })

    container.appendChild(card)

  })
}

function searchPosts() {
  var searchTerm = document.querySelector("#searchInput").value

  fetch(`${baseURL}/posts`, {
    headers: {
      'authorization': token
    }
  }).then(response => response.json())
    .then(function (data) {
      var filteredPosts = data.filter(function (post) {
        return post.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      renderPosts(filteredPosts)
    })
    .catch(function (error) {
      console.error("Ocorreu um erro ao buscar as postagens:", error)
    })
}

document.querySelector("#searchInput").addEventListener("input", searchPosts)

const shareCard = document.querySelector('.share-card')
const whatsappButton = shareCard.querySelector('.whatsapp-button')
const facebookButton = shareCard.querySelector('.facebook-button')
const copyLinkButton = shareCard.querySelector('.copy-link-button')
const closeButton = shareCard.querySelector('.close-button')


whatsappButton.addEventListener('click', () => {
  console.log(JSON.parse(localStorage.getItem('postObject')))
  compartilharViaWhatsApp(JSON.parse(localStorage.getItem('postObject')))
})

facebookButton.addEventListener('click', () => {
  //const post = JSON.parse(facebookButton.dataset.post)
  compartilharViaFacebook(JSON.parse(localStorage.getItem('postObject')))
})

copyLinkButton.addEventListener('click', () => {
  // const post = JSON.parse(copyLinkButton.dataset.post)
  copiarLinkPublicacao(JSON.parse(localStorage.getItem('postObject')))
})

closeButton.addEventListener('click', () => {
  shareCard.classList.add('hide')
})


function compartilharViaWhatsApp(post) {
  const mensagem = `Confira esta publicação: ${post.description} - ${post.image}`
  const link = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`
  window.open(link)
}

function compartilharViaFacebook(post) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.image)}`
  window.open(url)
}


function copiarLinkPublicacao(post) {

  const paginaAtual = window.location.href;
  const link = post.image

  const tempInput = document.createElement('input')
  tempInput.value = paginaAtual
  document.body.appendChild(tempInput)

  tempInput.select();
  tempInput.setSelectionRange(0, 99999)

  document.execCommand('copy')
  document.body.removeChild(tempInput)

  alert('Link da publicação copiado para a área de transferência!')
}
