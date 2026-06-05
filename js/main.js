/* ============================================================
   PORTAFOLIO MIGUEL TAPIA — LÓGICA (JavaScript)
   1. Cambio de tema claro/oscuro (recordando la preferencia)
   2. Menú móvil (hamburguesa)
   3. Animaciones de aparición al hacer scroll
   ============================================================ */

// Esperamos a que todo el HTML esté cargado antes de tocarlo.
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     1. CAMBIO DE TEMA (claro / oscuro)
     -------------------------------------------------------- */
  const html = document.documentElement;          // la etiqueta <html>
  const themeToggle = document.getElementById('themeToggle');

  // Al cargar: si el usuario ya eligió un tema antes, lo aplicamos.
  // Si no, respetamos la preferencia de su sistema operativo.
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  // Al hacer clic en el botón, alternamos entre claro y oscuro
  // y guardamos la elección para la próxima visita.
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* --------------------------------------------------------
     2. MENÚ MÓVIL (hamburguesa)
     -------------------------------------------------------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    // aria-expanded ayuda a lectores de pantalla (accesibilidad)
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Al hacer clic en un enlace, cerramos el menú (en móvil)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* --------------------------------------------------------
     3. ANIMACIONES AL SCROLLEAR (scroll reveal)
     Usamos IntersectionObserver: avisa cuando un elemento
     entra en la pantalla, y ahí le agregamos la clase que
     lo hace aparecer.
     -------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);  // ya apareció, dejamos de observarlo
      }
    });
  }, {
    threshold: 0.15  // se activa cuando el 15% del elemento es visible
  });

  revealElements.forEach((el) => observer.observe(el));

});
