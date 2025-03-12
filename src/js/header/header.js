document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu-btn');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const orderBtns = document.querySelectorAll('.order-btn');

  menuBtn.addEventListener('click', toggleDesktokMenu);

  function toggleDesktokMenu() {
    const isShown = navMenu.classList.contains('shown');
    if (isShown) {
      navMenu.classList.remove('shown');
    } else {
      navMenu.classList.add('shown');
    }
  }

  const toggleMenu = e => {
    const isOpen = e.target.classList.contains('is-open');
    if (isOpen) {
      e.target.classList.remove('is-open');
      header.classList.remove('mob-menu-open');
      document.body.style.overflow = '';
    } else {
      e.target.classList.add('is-open');
      header.classList.add('mob-menu-open');
      document.body.style.overflow = 'hidden';
    }
  };

  function turnOffMenu() {
    header.classList.remove('mob-menu-open');
    navMenu.classList.remove('shown');
    openMenuBtn.classList.remove('is-open');
    closeMenuBtn.classList.add('is-open');
    document.body.style.overflow = '';
  }

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', turnOffMenu);

  [...navLinks, ...orderBtns].forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        turnOffMenu();
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
});
