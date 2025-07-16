const feed = document.getElementById('feed');
const user = localStorage.getItem('currentUser');
if (!user) {
  window.location.href = "login.html";
}
document.getElementById('usernameDisplay').textContent = `@${user}`;

// Mostrar solo mis publicaciones
function cargarMisPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const misPosts = posts.filter(post => post.user === user).reverse();

  feed.innerHTML = "";

  if (misPosts.length === 0) {
    feed.innerHTML = "<p>No tenés publicaciones todavía.</p>";
    return;
  }

  misPosts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';

    const likeCount = post.likes || 0;

    div.innerHTML = `
      <div class="user">@${post.user}</div>
      <div class="text">${post.text}</div>
      <div class="actions">
        <span>❤️ ${likeCount} likes</span>
      </div>
    `;
    feed.appendChild(div);
  });
}

cargarMisPosts();

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = "login.html";
});

misPosts.forEach((post, i) => {
  const div = document.createElement('div');
  div.className = 'post';

  const likeCount = post.likes || 0;

  div.innerHTML = `
    <div class="user">@${post.user}</div>
    <div class="text">${post.text}</div>
    <div class="actions">
      <span>❤️ ${likeCount} likes</span>
      <button class="delete-btn" data-index="${posts.length - 1 - i}">🗑️ Eliminar</button>
    </div>
  `;

  feed.appendChild(div);
});

// Agregar funcionalidad de eliminación
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = btn.getAttribute('data-index');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    cargarMisPosts();
  });
});
