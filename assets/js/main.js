/*
  The only JavaScript on the site:
  1. Mobile menu
  2. "Copy e-mail address" button in the contact section

  1. Mobile menu

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

  // Button labels can be set per page (English pages use data-label-open/-close),
  // German is the default.
  var labelOpen = button.getAttribute('data-label-open') || 'Menü öffnen';
  var labelClose = button.getAttribute('data-label-close') || 'Menü schließen';

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? labelClose : labelOpen);
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


/*
  2. Copy e-mail address

  The "E-Mail schreiben" button opens the visitor's e-mail program (mailto:).
  Some visitors have none set up, so next to the address there is a button
  that copies it. The button is hidden in the HTML and only shown here,
  because it cannot work without JavaScript.
*/
(function () {
  var buttons = document.querySelectorAll('.copy-btn[data-copy]');

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers / pages opened from disk
    return new Promise(function (resolve, reject) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'absolute';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(field);
      if (ok) { resolve(); } else { reject(); }
    });
  }

  Array.prototype.forEach.call(buttons, function (button) {
    var label = button.querySelector('.copy-btn__text');
    var original = label.textContent;
    var timer;
    button.hidden = false;

    button.addEventListener('click', function () {
      copyText(button.getAttribute('data-copy')).then(function () {
        label.textContent = button.getAttribute('data-label-done') + ' ✓';
        clearTimeout(timer);
        timer = setTimeout(function () { label.textContent = original; }, 2000);
      });
    });
  });
})();
