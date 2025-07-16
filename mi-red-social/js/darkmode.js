// darkmode.js

function activarModoOscuro() {
  document.body.classList.add('dark');
  localStorage.setItem('modoOscuro', 'true');
}

function desactivarModoOscuro() {
  document.body.classList.remove('dark');
  localStorage.setItem('modoOscuro', 'false');
}

function cargarModo() {
  const modo = localStorage.getItem('modoOscuro');
  if (modo === null) {
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefiereOscuro) {
      document.body.classList.add('dark');
      localStorage.setItem('modoOscuro', 'true');
    }
  } else if (modo === 'true') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  cargarModo();

  const toggle = document.getElementById('toggleDarkMode');
  if (toggle) {
    const actualizarIcono = () => {
      const esOscuro = document.body.classList.contains('dark');
      toggle.textContent = esOscuro ? '☀️ Claro' : '🌙 Oscuro';
    };

    actualizarIcono();

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const esOscuro = document.body.classList.contains('dark');
      localStorage.setItem('modoOscuro', esOscuro.toString());
      actualizarIcono();
    });
  }
});

