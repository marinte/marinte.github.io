/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('header');
   const nav = document.getElementById('nav-wrap');
   const navLinks = [...nav.querySelectorAll('#nav a')];
   const sections = [...document.querySelectorAll('section')];

/*----------------------------------------------------*/
/* Smooth Scrolling
/* .smoothscroll = nav/arrows, .smooth-goto = portfolio tiles
------------------------------------------------------ */

   document.querySelectorAll('a.smoothscroll, a.smooth-goto').forEach(link => {
      link.addEventListener('click', e => {
         if (!link.hash) return;
         const target = document.querySelector(link.hash);
         if (!target) return;
         e.preventDefault();
         const offset = link.classList.contains('smooth-goto') ? 100 : 0;
         window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
         });
         if (!offset) history.pushState(null, '', link.hash);
      });
   });

/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

   function updateCurrentLink() {
      const line = window.innerHeight * 0.35;
      let current = 'home';
      for (const s of sections) {
         if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      if (current === 'resume') current = 'portfolio';
      navLinks.forEach(a =>
         a.parentElement.classList.toggle('current', a.hash === '#' + current));
   }

/*----------------------------------------------------*/
/* Fade In/Out Primary Navigation
------------------------------------------------------*/

   function updateNavVisibility() {
      const h = header.offsetHeight;
      const y = window.scrollY;
      nav.classList.toggle('nav-hidden', y > h * 0.2 && y < h && window.innerWidth > 768);
      nav.classList.toggle('opaque', y >= h * 0.2);
   }

   function onScroll() {
      updateCurrentLink();
      updateNavVisibility();
   }
   window.addEventListener('scroll', onScroll, { passive: true });
   window.addEventListener('resize', onScroll);
   onScroll();
});
