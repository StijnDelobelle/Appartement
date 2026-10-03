/* TEMPORARY PASSWORD GATE — safe to delete when the site goes public.
   This is a client-side preview gate, not server-side authentication. */
(function () {
  'use strict';

  var ACCESS_KEY = 'estate3-preview-unlocked';
  var PASSWORD_B64 = 'anVsZXM='; // intentionally lightweight for a temporary preview
  var body = document.body;

  function isUnlocked() {
    try { return sessionStorage.getItem(ACCESS_KEY) === '1'; }
    catch (e) { return false; }
  }

  function unlock() {
    body.classList.remove('site-locked');
    body.classList.add('site-unlocked');
    try { sessionStorage.setItem(ACCESS_KEY, '1'); } catch (e) {}
    window.dispatchEvent(new Event('resize'));
  }

  if (isUnlocked()) {
    unlock();
    return;
  }

  var form = document.getElementById('password-gate-form');
  var input = document.getElementById('password-gate-input');
  var error = document.getElementById('password-gate-error');

  if (!form || !input) return;

  window.setTimeout(function () { input.focus(); }, 80);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value || '';
    var encoded = '';
    try { encoded = btoa(unescape(encodeURIComponent(value))); } catch (e) {}

    if (encoded === PASSWORD_B64) {
      if (error) error.textContent = '';
      unlock();
      return;
    }

    if (error) error.textContent = 'Dat wachtwoord klopt niet.';
    input.value = '';
    input.focus();
  });
})();
