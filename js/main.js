/* Haley's Hideaways — Main JS */

// ── Gallery data ──────────────────────────────────────────────
const galleryImages = [
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20001.jpg', alt: 'Living room with fireplace' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20009.jpg', alt: 'Dining room' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20006.jpg', alt: 'Entryway' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20018.jpg', alt: 'Modern kitchen' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20031.jpg', alt: 'Bedroom' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20035.jpg', alt: 'Master bedroom' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20039.jpg', alt: 'Master bathroom' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20025.jpg', alt: 'Bathroom' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20047.jpg', alt: 'Pool' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20043.jpg', alt: 'Outdoor deck and hot tub' },
  { src: 'Photos/AJ_DeAnn%20Haley%20-%20052.jpg', alt: 'Front of house' },
];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[index].src;
  img.alt = galleryImages[index].alt;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function moveLightbox(dir) {
  currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[currentIndex].src;
  img.alt = galleryImages[currentIndex].alt;
}

// Keyboard nav for lightbox
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'ArrowRight') moveLightbox(1);
  if (e.key === 'ArrowLeft')  moveLightbox(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// ── Navbar scroll effect ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Footer year ───────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── PWA install prompt ────────────────────────────────────────
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('installBanner');
  if (banner) banner.style.display = 'flex';
});

const installBtn = document.getElementById('installBtn');
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === 'accepted') {
      document.getElementById('installBanner').style.display = 'none';
    }
  });
}

// ── Service Worker registration ───────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
