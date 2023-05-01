import * as Data from './data.js';
import * as Mobile from './mobile-key.js'

export default function redrawKeyboard(caps, shift, mobileShift) {
    const keys = document.querySelectorAll('.keyboard__key');
    const language = window.localStorage.getItem('language');
    let key, index;
    console.log('caps: ', caps, 'shift: ', shift, 'mobile shift: ', mobileShift)
    for(let i = 0; i < keys.length; i++) {
        key = keys[i];
        index = (caps && !((i > 0 && i < 14) || (language === 'en' && i < 14)) && (!Data.unCapsKeyIndex.includes(key.dataset.key) || (language === 'ru' && key.dataset.key !== 'Backslash' && key.dataset.key !== 'Slash'))) ? 1 : 0
        if(shift || mobileShift) index = +(!index);

        if(key.classList.contains('special-key')) continue;
        key.textContent = Data.keysDataContent[key.dataset.key][language][index];
        
        if(((i > 0 && i < 14) || (language === 'en' && i < 14)) && !shift && !mobileShift) {
            key.insertAdjacentHTML('afterbegin', `<span class="up-content">${ Data.keysDataContent[key.dataset.key][language][1] }</span>`)
        }
    }
}