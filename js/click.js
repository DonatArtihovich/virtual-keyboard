import * as Date from './data.js';

function makeKeyActive(e) {
  const activeKey = (e.type === 'mousedown') ? e.target : document.querySelector(`[data-key = ${e.code}]`);
  if (!Date.keysArr.includes(e.code) && e.type === 'keydown') return;

  activeKey.classList.add('keyboard__key_active');
}

function makeKeyInactive(e) {
  const activeKey = (e.type === 'mouseup') ? e.target : document.querySelector(`[data-key = ${e.code}]`);
  if (!Date.keysArr.includes(e.code) && e.type === 'keyup') return;

  activeKey.classList.remove('keyboard__key_active');
}

export default function addBasicFunctioning() {
  const keyboard = document.querySelector('.keyboard__keys');
  window.addEventListener('keydown', makeKeyActive);
  window.addEventListener('keyup', makeKeyInactive);

  keyboard.addEventListener('mousedown', (e) => { makeKeyActive(e); });
  keyboard.addEventListener('mouseup', (e) => { makeKeyInactive(e); });
}
