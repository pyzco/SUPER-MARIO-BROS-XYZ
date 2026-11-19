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
  initGame();
  initMobileControls();
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

// ══════════════════════════════════════════════════════════════════
//  MINI GAME — Console-style Mario
// ══════════════════════════════════════════════════════════════════
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Game Constants ──
  const TILE = 32;
  const COLS = 20;
  const ROWS = 10;
  canvas.width = COLS * TILE;
  canvas.height = ROWS * TILE;

  // Colors matching ANSI terminal
  const COLORS = {
    SKY:    '#5B9BD5',
    GROUND: '#8B6914',
    BRICK:  '#C84C09',
    PIPE:   '#43B047',
    COIN:   '#FBD000',
    MARIO:  '#E52521',
    MARIO_SKIN: '#FFB899',
    GOOMBA: '#A0522D',
    GOOMBA_DARK: '#7A3B1E',
    QUESTION: '#FFB400',
    GRID:   'rgba(255,255,255,0.03)',
  };

  // ── Level Map ──
  // 0=sky, 1=ground, 2=brick, 3=pipe, 4=question, 5=coin-collected
  const LEVEL_TEMPLATE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,4,0,2,4,2,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1],
  ];

  let level = JSON.parse(JSON.stringify(LEVEL_TEMPLATE));

  // ── Entities ──
  let mario = { x: 2 * TILE, y: 7 * TILE, w: TILE - 4, h: TILE - 2, vx: 0, vy: 0, onGround: false, facing: 1, lives: 3, score: 0 };
  let goombas = [
    { x: 6 * TILE, y: 7 * TILE, w: TILE - 4, h: TILE - 4, vx: -1, alive: true },
    { x: 14 * TILE, y: 5 * TILE, w: TILE - 4, h: TILE - 4, vx: -1, alive: true },
  ];
  let coins = [];
  let gameOver = false;

  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const MOVE_SPEED = 3.5;

  // ── Input ──
  const keys = {};
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (['a','d','w','s',' ','r'].includes(k)) {
      e.preventDefault();
      keys[k] = true;
    }
  });
  document.addEventListener('keyup', e => {
    keys[e.key.toLowerCase()] = false;
  });

  // ── Reset ──
  function resetGame() {
    level = JSON.parse(JSON.stringify(LEVEL_TEMPLATE));
    mario = { x: 2 * TILE, y: 7 * TILE, w: TILE - 4, h: TILE - 2, vx: 0, vy: 0, onGround: false, facing: 1, lives: 3, score: 0 };
    goombas = [
      { x: 6 * TILE, y: 7 * TILE, w: TILE - 4, h: TILE - 4, vx: -1, alive: true },
      { x: 14 * TILE, y: 5 * TILE, w: TILE - 4, h: TILE - 4, vx: -1, alive: true },
    ];
    coins = [];
    gameOver = false;
    updateHUD();
  }

  document.getElementById('btnResetGame').addEventListener('click', resetGame);

  // ── Collision Helpers ──
  function getTile(px, py) {
    const col = Math.floor(px / TILE);
    const row = Math.floor(py / TILE);
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return 1;
    return level[row][col];
  }

  function isSolid(tile) {
    return tile === 1 || tile === 2 || tile === 3 || tile === 4;
  }

  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ── Update ──
  function update() {
    if (gameOver) {
      if (keys['r']) resetGame();
      return;
    }
    if (keys['r']) { resetGame(); return; }

    // Movement
    mario.vx = 0;
    if (keys['a']) { mario.vx = -MOVE_SPEED; mario.facing = -1; }
    if (keys['d']) { mario.vx = MOVE_SPEED; mario.facing = 1; }
    if ((keys['w'] || keys[' ']) && mario.onGround) {
      mario.vy = JUMP_FORCE;
      mario.onGround = false;
    }

    // Gravity
    mario.vy += GRAVITY;
    if (mario.vy > 12) mario.vy = 12;

    // Horizontal collision
    const nextX = mario.x + mario.vx;
    const checkLeft = isSolid(getTile(nextX, mario.y + 2)) || isSolid(getTile(nextX, mario.y + mario.h - 2));
    const checkRight = isSolid(getTile(nextX + mario.w, mario.y + 2)) || isSolid(getTile(nextX + mario.w, mario.y + mario.h - 2));

    if (!checkLeft && !checkRight) {
      mario.x = nextX;
    }

    // Vertical collision
    const nextY = mario.y + mario.vy;
    mario.onGround = false;

    if (mario.vy > 0) {
      // Falling
      const footLeft = isSolid(getTile(mario.x + 2, nextY + mario.h));
      const footRight = isSolid(getTile(mario.x + mario.w - 2, nextY + mario.h));
      if (footLeft || footRight) {
        mario.y = Math.floor((nextY + mario.h) / TILE) * TILE - mario.h;
        mario.vy = 0;
        mario.onGround = true;
      } else {
        mario.y = nextY;
      }
    } else if (mario.vy < 0) {
      // Jumping up — head collision
      const headLeft = getTile(mario.x + 2, nextY);
      const headRight = getTile(mario.x + mario.w - 2, nextY);

      if (isSolid(headLeft) || isSolid(headRight)) {
        mario.y = Math.floor(nextY / TILE) * TILE + TILE;
        mario.vy = 0;

        // Hit question block → spawn coin
        const hitCol1 = Math.floor((mario.x + 2) / TILE);
        const hitCol2 = Math.floor((mario.x + mario.w - 2) / TILE);
        const hitRow = Math.floor(nextY / TILE);

        [hitCol1, hitCol2].forEach(c => {
          if (c >= 0 && c < COLS && hitRow >= 0 && hitRow < ROWS && level[hitRow][c] === 4) {
            level[hitRow][c] = 2; // Turn question into brick
            mario.score += 100;
            coins.push({ x: c * TILE + TILE/4, y: hitRow * TILE - TILE, life: 30 });
            updateHUD();
          }
        });
      } else {
        mario.y = nextY;
      }
    }

    // World bounds
    if (mario.x < 0) mario.x = 0;
    if (mario.x > (COLS - 1) * TILE) mario.x = (COLS - 1) * TILE;

    // Fall into pit
    if (mario.y > ROWS * TILE) {
      mario.lives--;
      updateHUD();
      if (mario.lives <= 0) {
        gameOver = true;
      } else {
        mario.x = 2 * TILE;
        mario.y = 7 * TILE;
        mario.vy = 0;
      }
    }

    // Goombas
    goombas.forEach(g => {
      if (!g.alive) return;
      g.x += g.vx;

      // Goomba ground check
      const gTileBelow = getTile(g.x + g.w / 2, g.y + g.h + 1);
      if (!isSolid(gTileBelow)) {
        // No ground, reverse
        g.vx *= -1;
        g.x += g.vx * 2;
      }

      // Goomba wall check
      const gTileAhead = g.vx > 0
        ? getTile(g.x + g.w + 1, g.y + g.h / 2)
        : getTile(g.x - 1, g.y + g.h / 2);
      if (isSolid(gTileAhead)) {
        g.vx *= -1;
      }

      // Mario vs Goomba
      if (aabb(mario, g)) {
        if (mario.vy > 0 && mario.y + mario.h - g.y < TILE / 2) {
          // Stomp
          g.alive = false;
          mario.vy = JUMP_FORCE * 0.6;
          mario.score += 200;
          updateHUD();
        } else {
          // Hit — lose life
          mario.lives--;
          updateHUD();
          if (mario.lives <= 0) {
            gameOver = true;
          } else {
            mario.x = 2 * TILE;
            mario.y = 7 * TILE;
            mario.vy = 0;
          }
        }
      }
    });

    // Coins animation
    coins = coins.filter(c => {
      c.y -= 2;
      c.life--;
      return c.life > 0;
    });
  }

  // ── Draw ──
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#1a3a5c');
    skyGrad.addColorStop(0.6, '#5B9BD5');
    skyGrad.addColorStop(1, '#87CEEB');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid overlay (terminal feel)
    ctx.strokeStyle = COLORS.GRID;
    ctx.lineWidth = 1;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        ctx.strokeRect(c * TILE, r * TILE, TILE, TILE);
      }
    }

    // Tiles
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = level[r][c];
        const tx = c * TILE;
        const ty = r * TILE;

        if (tile === 1) {
          // Ground
          ctx.fillStyle = COLORS.GROUND;
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.strokeStyle = '#6B4F0F';
          ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE - 2);
          // Ground detail
          ctx.fillStyle = '#A07720';
          ctx.fillRect(tx + 2, ty + 2, TILE / 2 - 2, TILE / 2 - 2);
          ctx.fillRect(tx + TILE / 2 + 1, ty + TILE / 2 + 1, TILE / 2 - 3, TILE / 2 - 3);
        } else if (tile === 2) {
          // Brick
          ctx.fillStyle = COLORS.BRICK;
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.strokeStyle = '#A83800';
          ctx.lineWidth = 1;
          ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE / 2 - 2);
          ctx.strokeRect(tx + 1, ty + TILE / 2, TILE / 2 - 1, TILE / 2 - 2);
          ctx.strokeRect(tx + TILE / 2 + 1, ty + TILE / 2, TILE / 2 - 2, TILE / 2 - 2);
        } else if (tile === 3) {
          // Pipe
          ctx.fillStyle = COLORS.PIPE;
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.fillStyle = '#5AD85E';
          ctx.fillRect(tx + 4, ty, 6, TILE);
        } else if (tile === 4) {
          // Question block
          ctx.fillStyle = COLORS.QUESTION;
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.strokeStyle = '#CC8F00';
          ctx.strokeRect(tx + 1, ty + 1, TILE - 2, TILE - 2);
          ctx.fillStyle = '#FFF';
          ctx.font = 'bold 18px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('?', tx + TILE / 2, ty + TILE / 2 + 1);
        }
      }
    }

    // Coins
    coins.forEach(c => {
      ctx.fillStyle = COLORS.COIN;
      ctx.beginPath();
      ctx.arc(c.x + TILE / 4, c.y + TILE / 4, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+100', c.x + TILE / 4, c.y - 4);
    });

    // Goombas
    goombas.forEach(g => {
      if (!g.alive) return;
      const gx = Math.round(g.x);
      const gy = Math.round(g.y);
      // Body
      ctx.fillStyle = COLORS.GOOMBA;
      ctx.fillRect(gx + 2, gy + 6, g.w - 4, g.h - 6);
      // Head (dome)
      ctx.beginPath();
      ctx.arc(gx + g.w / 2, gy + 10, g.w / 2 - 2, Math.PI, 0);
      ctx.fill();
      // Eyes
      ctx.fillStyle = '#FFF';
      ctx.fillRect(gx + 6, gy + 8, 5, 6);
      ctx.fillRect(gx + g.w - 11, gy + 8, 5, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(gx + 8, gy + 10, 3, 4);
      ctx.fillRect(gx + g.w - 9, gy + 10, 3, 4);
      // Feet
      ctx.fillStyle = COLORS.GOOMBA_DARK;
      ctx.fillRect(gx + 2, gy + g.h - 4, 8, 4);
      ctx.fillRect(gx + g.w - 10, gy + g.h - 4, 8, 4);
    });

    // Mario
    const mx = Math.round(mario.x);
    const my = Math.round(mario.y);
    const f = mario.facing;

    // Hat
    ctx.fillStyle = COLORS.MARIO;
    ctx.fillRect(mx + (f > 0 ? 4 : 2), my, TILE - 8, 8);

    // Face
    ctx.fillStyle = COLORS.MARIO_SKIN;
    ctx.fillRect(mx + 4, my + 8, TILE - 8, 8);

    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(mx + (f > 0 ? 16 : 8), my + 9, 3, 4);

    // Body
    ctx.fillStyle = COLORS.MARIO;
    ctx.fillRect(mx + 4, my + 16, TILE - 8, 8);

    // Overalls
    ctx.fillStyle = '#3355FF';
    ctx.fillRect(mx + 6, my + 20, TILE - 12, 6);

    // Legs
    ctx.fillStyle = '#3355FF';
    ctx.fillRect(mx + 6, my + 24, 6, 6);
    ctx.fillRect(mx + TILE - 14, my + 24, 6, 6);

    // Game over overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COLORS.MARIO;
      ctx.font = 'bold 28px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 15);
      ctx.fillStyle = '#FFF';
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillText('Presiona R para reiniciar', canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText(`Score: ${mario.score}`, canvas.width / 2, canvas.height / 2 + 45);
    }
  }

  // ── HUD ──
  function updateHUD() {
    const livesEl = document.getElementById('demoLives');
    const scoreEl = document.getElementById('demoScore');
    if (livesEl) livesEl.textContent = `♥ ${mario.lives}`;
    if (scoreEl) scoreEl.textContent = `★ ${mario.score}`;
  }

  // ── Game Loop ──
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}

// ══════════════════════════════════════════════════════════════════
//  MOBILE TOUCH CONTROLS
// ══════════════════════════════════════════════════════════════════
function initMobileControls() {
  const demoKeys = document.querySelectorAll('.demo-key');

  demoKeys.forEach(btn => {
    const key = btn.dataset.key;

    const simulateKey = (type) => {
      document.dispatchEvent(new KeyboardEvent(type, { key }));
    };

    // Visual feedback class
    const activate = () => {
      btn.classList.add('active');
      simulateKey('keydown');
    };
    const deactivate = () => {
      btn.classList.remove('active');
      simulateKey('keyup');
    };

    btn.addEventListener('mousedown', e => { e.preventDefault(); activate(); });
    btn.addEventListener('mouseup', deactivate);
    btn.addEventListener('mouseleave', deactivate);
    btn.addEventListener('touchstart', e => { e.preventDefault(); activate(); }, { passive: false });
    btn.addEventListener('touchend', deactivate);
  });
}
