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
