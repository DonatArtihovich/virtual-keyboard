import * as Data from './data.js';
import * as Special from './special-key.js'
import enterText from './enter-text.js';


export default function addKeyEvents() {
    const keyboard = document.querySelector('.keyboard__keys');
    
    keyboard.addEventListener('mousedown', e => { handleVirtualKey(e) });
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
        case 'ArrowRight': Special.handleSideArrow(e);
        case 'ArrowLeft': Special.handleSideArrow(e);
    }
}

function handleKeyDown(event, b) {
    switch(event.code) {
        case 'ShiftLeft': Special.handleLeftShift(b, event);
        case 'ShiftRight': Special.handleRightShift(b, event)
        case 'AltLeft': Special.handleLeftAlt(b);
        case 'AltRight': Special.handleRightAlt(b);
        case 'CapsLock': if(event.type !== 'keyup') Special.handleCaps(event);
    }
}