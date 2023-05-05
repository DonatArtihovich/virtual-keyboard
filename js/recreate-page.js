import * as Data from './data.js';

export default function redrawKeyboard() {
  const keys = document.querySelectorAll('.keyboard__key');
  const language = window.localStorage.getItem('language');
  let key; let
    index;

  for (let i = 0; i < keys.length; i += 1) {
    key = keys[i];
    index = (Data.keyStates.onCaps && !((i > 0 && i < 14) || (language === 'en' && i < 14)) && (!Data.unCapsKeyIndex.includes(key.dataset.key) || (language === 'ru' && key.dataset.key !== 'Backslash' && key.dataset.key !== 'Slash'))) ? 1 : 0;
    if (Data.keyStates.onShift || Data.keyStates.onMobileShift) index = +(!index);

    if (!key.classList.contains('special-key')) {
      key.textContent = Data.keysDataContent[key.dataset.key][language][index];

      if (((i > 0 && i < 14) || (language === 'en' && i < 14)) && !Data.keyStates.onShift && !Data.keyStates.onMobileShift) {
        key.insertAdjacentHTML('afterbegin', `<span class="up-content">${Data.keysDataContent[key.dataset.key][language][1]}</span>`);
      }
    }
  }
}
