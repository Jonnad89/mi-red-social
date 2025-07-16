// Para el login

const loginBtn = document.getElementById("loginBtn");
if(loginBtn) {
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value.trm();
        if(username) {
            localStorage.setItem("currenUser", username);
            window.location.href = "index.html";
        }
    });
}

// para el registro

const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value.trim();
    if (newUsername) {
      localStorage.setItem('registeredUser', newUsername); // por ahora simple
      localStorage.setItem('currentUser', newUsername);
      window.location.href = "index.html";
    }
  });
}