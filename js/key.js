// import * as Date from './data.js';

export default function initFunctioning() {
    window.addEventListener('keydown', makeKeyActive);
    window.addEventListener('keyup', makeKeyInactive);


}

function makeKeyActive (e) {
    const activeKey = document.querySelector(`[data-key = ${ e.code }]`);
    activeKey.classList.add('keyboard__key_active');
}

function makeKeyInactive (e) {
    const activeKey = document.querySelector(`[data-key = ${ e.code }]`);
    activeKey.classList.remove('keyboard__key_active')
}
