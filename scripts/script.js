// Mobile nav
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuBtn?.classList.remove('open');
  navLinks.classList.remove('open');
}));

// Sticky nav border
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth jump to case from index click
document.querySelectorAll('.case-row').forEach(row => {
  row.addEventListener('click', () => {
    const target = row.dataset.target;
    if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Résumé modal
const modal = document.getElementById('resume-modal');
const openBtn = document.getElementById('open-resume');
const openModal = (e) => {
  if (e) e.preventDefault();
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
openBtn?.addEventListener('click', openModal);
modal?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') closeModal();
});
