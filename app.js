const menu = document.querySelector('.mobile-menu');
const menuButton = menu?.querySelector('summary');
menu?.addEventListener('toggle', () => {
  menuButton.setAttribute('aria-label', menu.open ? 'Close navigation' : 'Open navigation');
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.open) { menu.open = false; menuButton.focus(); }
});
