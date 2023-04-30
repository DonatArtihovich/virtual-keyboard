import * as Data from './data.js';
import * as Special from './special-key.js'
import enterText from './enter-text.js';


export default function addKeyEvents() {
    const keyboard = document.querySelector('.keyboard__keys');
    
    keyboard.addEventListener('mousedown', handleVirtualKey);
    window.addEventListener('keydown', e => { handleKeyDown(e, true) });
    window.addEventListener('keyup', e => { handleKeyDown(e, false) });

}

function handleVirtualKey(event) {
    if(!event.target.classList.contains('keyboard__key')) return
    let onShift = Special.onShift;
    let onAlt = Special.onAlt;
    let onCaps = Special.onCaps;
    const keyName = event.target.dataset.key;
    
    if(Data.keysDataContent[keyName]) {
        enterText(keyName, onShift, onCaps)
    } else {
        handleSpecialKey(keyName, event)
    }
}

function handleSpecialKey(key, e) {
    switch(key) {
        case 'Space': Special.handleSpace(e);
        case 'Tab': Special.handleTab(e);
        case 'Enter': Special.handleEnter(e);
        case 'CapsLock': Special.handleCaps(e);
        case 'Backspace': Special.handleBackspace(e);
        case 'Delete': Special.handleDelete(e);
    }
}

function handleKeyDown(event, b) {
    switch(event.code) {
        case 'ShiftLeft': Special.handleShift(b, true);
        case 'ShiftRight': Special.handleShift(b)
        case 'AltLeft': Special.handleAlt(b);
        case 'AltRight': Special.handleAlt(b);
        case 'CapsLock': if(event.type !== 'keyup') Special.handleCaps(event);
    }
}



