(function () {
  // Inject the base style immediately so first paint is already at opacity:0
  var s = document.createElement('style');
  s.textContent = 'html{opacity:0;transition:opacity 0.35s ease}html.page-in{opacity:1}' +
    '*{cursor:none!important}' +
    '#custom-cursor{position:fixed;top:0;left:0;width:16px;height:16px;background:#fff;border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:difference;transform:translate(-50%,-50%) scale(1);transition:transform 0.15s ease,opacity 0.2s ease}' +
    '#custom-cursor.hovered{transform:translate(-50%,-50%) scale(2.5)}';
  document.head.appendChild(s);

  // Fade in once DOM is ready + set up cursor
  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.add('page-in');
    });

    var cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var hoverable = el && el.closest('a, button, [role="button"], input, label, select, textarea');
      cursor.classList.toggle('hovered', !!hoverable);
    });
    document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; });
  });

  // Fade out before navigating away
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    // Ignore anchors, external links, and new-tab links
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;
    e.preventDefault();
    document.documentElement.classList.remove('page-in');
    setTimeout(function () { window.location.href = href; }, 350);
  });
})();
