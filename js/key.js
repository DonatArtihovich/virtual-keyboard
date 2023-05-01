import * as Data from './data.js';
import * as Special from './special-key.js';
import * as Mobile from './mobile-key.js';
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
    let onMobileShift = Mobile.onMobileShift;
    let onCaps = Special.onCaps;
    const keyName = event.target.dataset.key;
    
    if(Data.keysDataContent[keyName]) {
        enterText(keyName, onShift, onCaps, onMobileShift)
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
        case 'ArrowLeft': Special.handleLeftArrow(e);
        case 'ArrowRight': Special.handleRightArrow(e);
        case 'ArrowUp': Special.handleUpArrow(e);
        case 'ArrowDown': Special.handleDownArrow(e);
        case 'ShiftLeft': Mobile.handleMobileLeftShift(true, e);
        case 'ShiftRight': Mobile.handleMobileRightShift(true, e);
        case 'AltLeft': Mobile.handleMobileLeftAlt(e);
        case 'AltRight': Mobile.handleMobileRightAlt(e);
    }
}

function handleKeyDown(event, b) {
    switch(event.code) {
        case 'ShiftLeft': Special.handleLeftShift(b, event);
        case 'ShiftRight': Special.handleRightShift(b, event)
        case 'AltLeft': Special.handleLeftAlt(b);
        case 'AltRight': Special.handleRightAlt(b);
        case 'CapsLock': if(event.type !== 'keyup') Special.handleCaps(event);
        case 'ControlLeft': Special.handleLeftControl(b);
        case 'ControlRight': Special.handleRightControl(b);
    }
}