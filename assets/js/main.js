/*
  Mobile menu (the only JavaScript on the site).

  Below 760px the navigation is hidden and a menu button appears (see style.css, section 15).
  This script:
  - opens / closes the menu when the button is clicked,
  - closes it again when a link inside is clicked, when Escape is pressed,
    or when the window becomes wide enough for the normal navigation,
  - keeps aria-expanded and the button label up to date for screen readers.
*/
(function () {
  var button = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  if (!button || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  function isOpen() {
    return button.getAttribute('aria-expanded') === 'true';
  }

  button.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  // Clicking a link in the menu jumps to the section, so the menu can close.
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  // Escape closes the menu and puts the keyboard focus back on the button.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  // If the window gets wider than the mobile breakpoint, reset the menu.
  var desktop = window.matchMedia('(min-width: 761px)');
  function onResize() {
    if (desktop.matches) setOpen(false);
  }
  if (desktop.addEventListener) {
    desktop.addEventListener('change', onResize);
  } else if (desktop.addListener) {
    desktop.addListener(onResize); // older Safari
  }
})();
