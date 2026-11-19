/* ══════════════════════════════════════════════════════════════════
   Super Mario Bros XYZ — Landing Page Script
   Vanilla JavaScript · Zero Dependencies
   ══════════════════════════════════════════════════════════════════ */

// ╔══════════════════════════════════════════════════════════════════╗
// ║  CONFIG — Edita estas rutas antes de hacer deploy               ║
// ╚══════════════════════════════════════════════════════════════════╝
const CONFIG = {
  // Repositorio en GitHub
  githubRepo: 'https://github.com/pyzco/super-mario-bros-xyz',

  // Informe técnico (PDF local o URL externa)
  informePDF: './informe.pdf',

  // Presentación (PDF local, o enlace a Google Slides / Canva)
  presentacionURL: './presentacion.pdf',
  // Si usas un enlace externo, descomenta la línea de abajo:
  // presentacionURL: 'https://docs.google.com/presentation/d/TU_ID/edit',

  // Diagrama UML (imagen o PDF local)
  umlImage: './uml.png',
  // Alternativas: './uml.pdf', './uml.svg', etc.

  // Comando de compilación
  compileCommand: 'g++ -std=c++17 -o mario main.cpp Mundo.cpp Mario.cpp Goomba.cpp BloqueEstatico.cpp Entidad.cpp',
};

// ══════════════════════════════════════════════════════════════════
//  INITIALIZATION
// ══════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initNavbar();
  initParticles();
  initCopyCompile();
  initModals();
  initUMLModal();
  initScrollSpy();
});

// ══════════════════════════════════════════════════════════════════
//  APPLY CONFIG URLS
// ══════════════════════════════════════════════════════════════════
function applyConfig() {
  // GitHub links
  const githubLinks = ['heroGithubBtn', 'cardGithubLink', 'cardDownloadCode'];
  githubLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = CONFIG.githubRepo;
  });

  // Informe
  const informeLink = document.getElementById('cardInformeLink');
  if (informeLink) informeLink.href = CONFIG.informePDF;

  // Presentación
  const presLink = document.getElementById('cardPresentacionLink');
  if (presLink) presLink.href = CONFIG.presentacionURL;

}

// ══════════════════════════════════════════════════════════════════
//  NAVBAR
// ══════════════════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Scroll state
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('navbar--scrolled', scrollY > 50);
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    links.classList.toggle('is-open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
    });
  });
}

// ══════════════════════════════════════════════════════════════════
//  SCROLL SPY — Active nav link
// ══════════════════════════════════════════════════════════════════
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ══════════════════════════════════════════════════════════════════
//  HERO PARTICLES
// ══════════════════════════════════════════════════════════════════
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const SYMBOLS = ['█', '▓', '░', '●', '★', '♦', '◆', '■'];
  const COLORS = ['#E52521', '#43B047', '#FBD000', '#58A6FF'];
  const COUNT = 30;

  for (let i = 0; i < COUNT; i++) {
    const span = document.createElement('span');
    span.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    span.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      color: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      opacity: ${0.04 + Math.random() * 0.08};
      font-size: ${12 + Math.random() * 20}px;
      font-family: 'JetBrains Mono', monospace;
      pointer-events: none;
      animation: particleFloat ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay: ${-Math.random() * 10}s;
    `;
    container.appendChild(span);
  }

  // Inject animation
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${10 + Math.random() * 20}px, -${10 + Math.random() * 30}px) rotate(5deg); }
        50% { transform: translate(-${5 + Math.random() * 15}px, ${10 + Math.random() * 20}px) rotate(-3deg); }
        75% { transform: translate(${5 + Math.random() * 10}px, -${5 + Math.random() * 15}px) rotate(2deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ══════════════════════════════════════════════════════════════════
//  COPY COMPILE COMMAND
// ══════════════════════════════════════════════════════════════════
function initCopyCompile() {
  const btn = document.getElementById('btnCopyCompile');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.compileCommand);
      showToast('✓ Comando copiado al portapapeles');
      const icon = document.getElementById('copyIcon');
      if (icon) {
        icon.textContent = '✓';
        setTimeout(() => { icon.textContent = '📋'; }, 2000);
      }
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = CONFIG.compileCommand;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✓ Comando copiado');
    }
  });
}

// ══════════════════════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════════════════════
let toastEl = null;
function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  setTimeout(() => toastEl.classList.remove('is-visible'), 2500);
}

// ══════════════════════════════════════════════════════════════════
//  MODALS
// ══════════════════════════════════════════════════════════════════
function initModals() {
  // Informe preview
  const btnInforme = document.getElementById('btnPreviewInforme');
  if (btnInforme) {
    btnInforme.addEventListener('click', () => {
      openPDFModal('Informe Técnico', CONFIG.informePDF);
    });
  }

  // Presentación preview
  const btnPres = document.getElementById('btnPreviewPresentation');
  if (btnPres) {
    btnPres.addEventListener('click', () => {
      openPDFModal('Presentación', CONFIG.presentacionURL);
    });
  }

  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function openPDFModal(title, url) {
  const modal = document.getElementById('modalPDF');
  const titleEl = document.getElementById('modalPDFTitle');
  const body = document.getElementById('modalPDFBody');
  const extBtn = document.getElementById('btnOpenPDFExternal');

  if (titleEl) titleEl.textContent = title;
  if (extBtn) extBtn.href = url;

  if (body) {
    body.innerHTML = `<iframe src="${url}#toolbar=1&navpanes=1&scrollbar=1" title="${title}" style="width:100%;height:100%;border:none;display:block;"></iframe>`;
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('is-open'));
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════════════
//  UML PAN & ZOOM VIEWER (High-Res 2145×4305)
// ══════════════════════════════════════════════════════════════════
function initUMLModal() {
  const btn = document.getElementById('btnOpenUML');
  const modal = document.getElementById('modalUML');
  const viewport = document.getElementById('panzoomViewport');
  const layer = document.getElementById('panzoomLayer');
  const img = document.getElementById('umlImg');
  const zoomBadge = document.getElementById('zoomLevel');
  const extBtn = document.getElementById('btnOpenUMLExternal');

  if (!btn || !modal || !viewport || !layer || !img) return;

  if (extBtn) extBtn.href = CONFIG.umlImage;
  img.src = CONFIG.umlImage;

  // Transform state
  let scale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function applyTransform() {
    layer.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    if (zoomBadge) {
      zoomBadge.textContent = `${Math.round(scale * 100)}%`;
    }
  }

  function fitWidth() {
    const vpW = viewport.clientWidth;
    const imgW = img.naturalWidth || 2145;
    scale = Math.min(2, Math.max(0.15, (vpW - 40) / imgW));
    panX = Math.max(20, (vpW - imgW * scale) / 2);
    panY = 24;
    applyTransform();
  }

  function fitAll() {
    const vpW = viewport.clientWidth;
    const vpH = viewport.clientHeight;
    const imgW = img.naturalWidth || 2145;
    const imgH = img.naturalHeight || 4305;
    scale = Math.min((vpW - 40) / imgW, (vpH - 40) / imgH, 1.5);
    scale = Math.max(0.1, scale);
    panX = (vpW - imgW * scale) / 2;
    panY = Math.max(20, (vpH - imgH * scale) / 2);
    applyTransform();
  }

  function reset100() {
    scale = 1;
    const vpW = viewport.clientWidth;
    const imgW = img.naturalWidth || 2145;
    panX = Math.max(20, (vpW - imgW) / 2);
    panY = 24;
    applyTransform();
  }

  function zoomAt(factor, clientX, clientY) {
    const rect = viewport.getBoundingClientRect();
    const cx = (clientX !== undefined ? clientX : rect.left + rect.width / 2) - rect.left;
    const cy = (clientY !== undefined ? clientY : rect.top + rect.height / 2) - rect.top;

    const newScale = Math.max(0.08, Math.min(4.0, scale * factor));
    panX = cx - (cx - panX) * (newScale / scale);
    panY = cy - (cy - panY) * (newScale / scale);
    scale = newScale;
    applyTransform();
  }

  // Open modal
  btn.addEventListener('click', () => {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Once image dimensions are known, default to Fit Width
    if (img.complete && img.naturalWidth > 0) {
      setTimeout(fitWidth, 50);
    } else {
      img.onload = () => setTimeout(fitWidth, 50);
    }
  });

  // Zoom buttons
  const btnIn = document.getElementById('btnZoomIn');
  const btnOut = document.getElementById('btnZoomOut');
  const btnFitW = document.getElementById('btnZoomFitWidth');
  const btnFit = document.getElementById('btnZoomFit');
  const btn100 = document.getElementById('btnZoom100');

  if (btnIn) btnIn.addEventListener('click', () => zoomAt(1.25));
  if (btnOut) btnOut.addEventListener('click', () => zoomAt(0.8));
  if (btnFitW) btnFitW.addEventListener('click', fitWidth);
  if (btnFit) btnFit.addEventListener('click', fitAll);
  if (btn100) btn100.addEventListener('click', reset100);

  // Mouse wheel zoom focused on cursor
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    zoomAt(factor, e.clientX, e.clientY);
  }, { passive: false });

  // Pan (Mouse drag)
  viewport.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    viewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      viewport.style.cursor = 'grab';
    }
  });

  // Double click to toggle Fit Width / 100%
  viewport.addEventListener('dblclick', e => {
    e.preventDefault();
    if (Math.abs(scale - 1) < 0.15) {
      fitWidth();
    } else {
      zoomAt(1 / scale, e.clientX, e.clientY);
    }
  });

  // Touch support (mobile pan & pinch zoom)
  let touchDist = 0;
  viewport.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    } else if (e.touches.length === 2) {
      isDragging = false;
      touchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && isDragging) {
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY;
      applyTransform();
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchDist > 0) {
        const factor = dist / touchDist;
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        zoomAt(factor, midX, midY);
      }
      touchDist = dist;
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    isDragging = false;
    touchDist = 0;
  });
}

