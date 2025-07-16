// Verificar si el usuario está logueado
const user = localStorage.getItem('currentUser');
if (!user) {
  window.location.href = "login.html";
}

document.getElementById("usernameDisplay").textContent = `Hola, ${user}`;

// Publicar post
const postButton = document.getElementById('postButton');
const postText = document.getElementById('postText');
const feed = document.getElementById('feed');

function cargarPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  feed.innerHTML = "";

  posts.reverse().forEach((post, index) => {
    const div = document.createElement('div');
    div.className = 'post';

    const likeCount = post.likes || 0;
    const replies = post.replies || [];

    div.innerHTML = `
      <div class="user">@${post.user}</div>
      <div class="text">${post.text}</div>
      ${post.image ? `<img src="${post.image}" alt="imagen del post">` : ''}


      <div class="actions">
        <button class="action-btn like-btn" data-index="${index}">❤️ <span>${likeCount}</span></button>
        <button class="action-btn reply-btn" data-index="${index}">💬 Responder</button>
        <button class="action-btn share-btn" data-text="${post.text}">🔄 Compartir</button>
      </div>

      <div class="comment-section" id="reply-${index}">
        <textarea placeholder="Escribí tu respuesta..."></textarea>
        <button class="send-reply" data-index="${index}">Enviar</button>
      </div>

      <div class="replies">
        ${replies.map(reply => `
          <div class="reply">
            <strong>@${reply.user}:</strong> ${reply.text}
          </div>
        `).join('')}
      </div>
    `;

    feed.appendChild(div);
  });

  agregarEventosPosts();
}



postButton.addEventListener('click', () => {
  const text = postText.value.trim();
  const imageInput = document.getElementById('postImage');
  const file = imageInput.files[0];

  if (!text && !file) return;

  const nuevoPost = {
    user,
    text,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: []
  };

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      nuevoPost.image = reader.result;
      guardarPost(nuevoPost);
    };
    reader.readAsDataURL(file);
  } else {
    guardarPost(nuevoPost);
  }

  postText.value = '';
  imageInput.value = '';
});

function guardarPost(post) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
  cargarPosts();
};

cargarPosts();

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
});

function agregarEventosPosts() {
  // Likes
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      const actualIndex = posts.length - 1 - index; // invertir porque hicimos reverse
      posts[actualIndex].likes = (posts[actualIndex].likes || 0) + 1;
      localStorage.setItem('posts', JSON.stringify(posts));
      cargarPosts(); // recargar vista
    });
  });

  // Responder
  const replyButtons = document.querySelectorAll('.reply-btn');
  replyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      const section = document.getElementById(`reply-${index}`);
      section.style.display = section.style.display === 'flex' ? 'none' : 'flex';
    });
  });

  const sendReplyBtns = document.querySelectorAll('.send-reply');
  sendReplyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = btn.getAttribute('data-index');
    const textarea = document.querySelector(`#reply-${index} textarea`);
    const respuesta = textarea.value.trim();
    if (respuesta) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
      const realIndex = posts.length - 1 - index;

      if (!posts[realIndex].replies) {
        posts[realIndex].replies = [];
      }

      posts[realIndex].replies.push({ user, text: respuesta });

      localStorage.setItem('posts', JSON.stringify(posts));
      textarea.value = '';
      cargarPosts(); // recarga con la respuesta visible
    }
  });
});

  // Compartir
  const shareBtns = document.querySelectorAll('.share-btn');
  shareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      navigator.clipboard.writeText(text)
        .then(() => alert('¡Texto copiado para compartir!'))
        .catch(() => alert('No se pudo copiar'));
    });
  });
}
