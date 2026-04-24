(function () {
  const DARK = 'dark';
  const root = document.documentElement;

  // Apply saved preference before first paint to avoid flash
  if (localStorage.getItem('theme') === DARK) root.classList.add(DARK);

  function buildButton() {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    Object.assign(btn.style, {
      position:   'fixed',
      bottom:     '18px',
      right:      '20px',
      zIndex:     '9990',
      background: 'none',
      border:     'none',
      cursor:     'pointer',
      fontFamily: "'DM Mono', monospace",
      fontSize:   '15px',
      padding:    '4px 6px',
      borderRadius: '4px',
      opacity:    '0.38',
      transition: 'opacity 0.15s',
      lineHeight: '1',
    });

    function sync() {
      const isDark = root.classList.contains(DARK);
      btn.textContent = isDark ? '◐' : '◑';
      btn.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
    }

    btn.addEventListener('mouseenter', () => (btn.style.opacity = '0.9'));
    btn.addEventListener('mouseleave', () => (btn.style.opacity = '0.38'));
    btn.addEventListener('click', () => {
      const isDark = root.classList.toggle(DARK);
      localStorage.setItem('theme', isDark ? DARK : 'light');
      sync();
      document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: isDark } }));
    });

    sync();
    document.body.appendChild(btn);
  }

  if (document.body) buildButton();
  else document.addEventListener('DOMContentLoaded', buildButton);
})();
