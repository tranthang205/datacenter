/* ═══════════════════════════════════════════════════════════
   BLOGHUB CENTRAL — Shared JavaScript v2
   Common functionality across all screens
   ═══════════════════════════════════════════════════════════ */

/* ── THEME TOGGLE (with localStorage persistence) ── */
(function initTheme() {
  const saved = localStorage.getItem('bloghub-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeBtn');
    if (btn) {
      const current = document.documentElement.getAttribute('data-theme');
      btn.textContent = current === 'dark' ? '🌙' : '☀️';
    }
  });
})();

function toggleTheme() {
  const h = document.documentElement, b = document.getElementById('themeBtn');
  if (h.getAttribute('data-theme') === 'dark') {
    h.setAttribute('data-theme', 'light');
    if (b) b.textContent = '☀️';
    localStorage.setItem('bloghub-theme', 'light');
  } else {
    h.setAttribute('data-theme', 'dark');
    if (b) b.textContent = '🌙';
    localStorage.setItem('bloghub-theme', 'dark');
  }
}

/* ── MOBILE SIDEBAR TOGGLE ── */
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
  // Close sidebar on overlay click
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.addEventListener('click', toggleSidebar);
});

/* ── MODAL HELPERS ── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('show');
    el.setAttribute('aria-hidden', 'false');
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('show');
    el.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.remove('show');
    });
  });
});

/* ── TOAST NOTIFICATIONS ── */
function toast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type === 'error' ? ' error' : '');
  t.setAttribute('role', 'alert');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── CONTEXT MENU ── */
let activeCtx = null;

function showCtx(menuId, x, y) {
  hideCtx();
  const menu = document.getElementById(menuId);
  if (!menu) return;
  menu.style.left = Math.min(x, window.innerWidth - 220) + 'px';
  menu.style.top = Math.min(y, window.innerHeight - 300) + 'px';
  menu.classList.add('show');
  activeCtx = menu;
}

function hideCtx() {
  if (activeCtx) activeCtx.classList.remove('show');
  activeCtx = null;
}

document.addEventListener('click', hideCtx);
document.addEventListener('contextmenu', e => {
  if (!e.target.closest('[data-ctx]')) hideCtx();
});

/* ── TAB SWITCHING ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabs').forEach(t => {
    t.querySelectorAll('.tab-btn').forEach(b => {
      b.addEventListener('click', () => {
        t.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
      });
    });
  });
});

/* ── KEYBOARD SHORTCUTS ── */
document.addEventListener('keydown', e => {
  // Escape closes modals & context menus
  if (e.key === 'Escape') {
    hideCtx();
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    const sidebar = document.querySelector('.sidebar.open');
    if (sidebar) toggleSidebar();
  }
});
