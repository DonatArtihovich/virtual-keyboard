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
    let onControl = Special.onControl;
    let onMobileControl = Mobile.onMobileControl;
    const keyName = event.target.dataset.key;
    
    if(Data.keysDataContent[keyName]) {
        enterText(keyName, onShift, onCaps, onMobileShift, onControl, onMobileControl)
    } else {
        handleSpecialKey(keyName, event)
    }
}

function handleSpecialKey(key, e) {
    switch(key) {
        case 'Space': Mobile.handleMobileSpace(e);
        case 'Tab': Mobile.handleMobileTab(e);
        case 'Enter': Mobile.handleMobileEnter(e);
        case 'CapsLock': Special.handleCaps(e);
        case 'Backspace': Special.handleBackspace(e);
        case 'Delete': Special.handleDelete(e);
        case 'ArrowLeft': Mobile.handleMobileLeftArrow(e);
        case 'ArrowRight': Mobile.handleMobileRightArrow(e);
        case 'ArrowUp': Mobile.handleMobileUpArrow(e);
        case 'ArrowDown': Mobile.handleMobileDownArrow(e);
        case 'ShiftLeft': Mobile.handleMobileLeftShift(true, e);
        case 'ShiftRight': Mobile.handleMobileRightShift(e);
        case 'AltLeft': Mobile.handleMobileLeftAlt(e);
        case 'AltRight': Mobile.handleMobileRightAlt(e);
        case 'ControlRight': Mobile.handleMobileRightControl(e);
        case 'ControlLeft': Mobile.handleMobileLeftControl(e);
    }
}

function handleKeyDown(event, b) {
    switch(event.code) {
        case 'ShiftLeft': Special.handleLeftShift(b, event);
        case 'ShiftRight': Special.handleRightShift(b, event)
        case 'AltLeft': Special.handleLeftAlt(b);
        case 'AltRight': Special.handleRightAlt(b);
        case 'CapsLock': if(event.type !== 'keyup') Special.handleCaps(event);
        case 'ControlLeft': Special.handleLeftControl(b, event);
        case 'ControlRight': Special.handleRightControl(b, event);
    }
}