import * as Data from './data.js';

export default function redrawKeyboard(caps) {
    const keys = document.querySelectorAll('.keyboard__key');
    const language = window.localStorage.getItem('language');
    let key, index;

    for(let i = 0; i < keys.length; i++) {
        key = keys[i];
        index = (caps && !((i > 0 && i < 14) || (language === 'en' && i < 14)) && !Data.unCapsKeyIndex.includes(key.dataset.key)) ? 1 : 0
        console.log(key.classList.contains('.special-key'))
        if(key.classList.contains('special-key')) continue;
        key.textContent = Data.keysDataContent[key.dataset.key][language][index];

        if((i > 0 && i < 14) || (language === 'en' && i < 14)) {
            key.insertAdjacentHTML('afterbegin', `<span class="up-content">${ Data.keysDataContent[key.dataset.key][language][1] }</span>`)
        }
    }
}