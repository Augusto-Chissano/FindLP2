const baseURL = 'http://localhost:3333'
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
const profileName = document.getElementById('profile-name')
const publicar = document.querySelector(".publicar")

profileName.textContent = `${user.firstName} ${user.lastName}`

publicar.addEventListener("click", () => {
    window.location.href = "create-post.html"
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
    //const myPosts = posts.filter((post) => post.author == user._id)
    const userPost = posts.filter((post) => (post.author === user._id) && (post.deleted === false) && (post.found === false))

    userPost.forEach(post => {
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
            <button title="like" id="encontrado" data-post-id="${post._id}" class="post-button encontrado">
            <i class="fas fa-check-circle"></i> Encontrado
            </button>
            <button title="share" id="eliminar" data-post-id="${post._id}" class="post-button eliminar">
            <i class="fas fa-trash-alt"></i>Eliminar
            </button>
          </div>
        </div>
      `
        container.appendChild(card)
    })

    const btnEncontrado = document.querySelectorAll('.post-button.encontrado')
    btnEncontrado.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = btn.dataset.postId
            console.log(postId)
            marcarEncontrado(postId)
        })
    })

    const btnEliminar = document.querySelectorAll('.post-button.eliminar')
    btnEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = btn.dataset.postId
            //console.log(postId)
            excluirPostagem(postId)
        })
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


function marcarEncontrado(id) {
    fetch(`${baseURL}/posts/${id}/found`, {
        method: 'PUT'
    })
        .then(response => {
            if (response.ok) {
                fetchPosts()
                console.log(`Postagem ${id} marcada como encontrado`)
            } else {
                console.error(`Erro ao marcar a postagem ${id} como encontrado`)
            }
        })
        .catch(error => {
            console.error(`Erro na requisição para marcar a postagem ${id} como encontrado:`, error)
        })
}

function excluirPostagem(id) {
    fetch(`${baseURL}/posts/${id}/delete`, {
        method: 'PUT',
    })
        .then(response => {
            if (response.ok) {
                fetchPosts()
            } else {
                console.error(`Erro ao excluir a postagem ${id}`)
            }
        })
        .catch(error => {
            console.error(`Erro na requisição para excluir a postagem ${id}:`, error)
        })
}
