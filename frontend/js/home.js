const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
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

  container.innerHTML = ''

  for (const post of posts) {
    const card = document.createElement('div')
    card.classList.add('post-card')

    card.innerHTML = `
        <div class="author">
          <img src="img/model.jpg" alt="Imagem do autor">
          <span class="author-name">${post.authorName}</span>
        </div>
        <div class="post-info">
          <span class="post-date">${post.date.slice(0, 10)}</span>
          <p class="post-description">${post.description}</p>
          <img src= "${baseURL}/uploads/${post.image}" alt="Imagem da publicação">
          <div class="post-actions">
            <button title="like" class="like-button">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button title="share" class="share-button">
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      `
    container.appendChild(card)
  }
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
