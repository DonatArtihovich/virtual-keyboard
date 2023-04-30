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
        handleSpecialKey(keyName)
    }
}

function handleSpecialKey(key) {
    switch(key) {
        case 'Space': enterText(Data.spaceContents['Space']);
        case 'Tab': enterText(Data.spaceContents['Tab']);
        case 'CapsLock': Special.handleCaps();
        case 'Backspace': Special.handleBackspace();
        case 'Delete': Special.handleDelete();
    }
}

function handleKeyDown(event, b) {
    switch(event.code) {
        case 'ShiftLeft': Special.handleShift(b);
        case 'ShiftRight': Special.handleShift(b)
        case 'AltLeft': Special.handleAlt(b);
        case 'AltRight': Special.handleAlt(b);
        case 'CapsLock': if(event.type !== 'keyup') Special.handleCaps();
    }
}



