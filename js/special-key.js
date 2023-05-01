import changeKeyboardLanguage from './language.js';
import redrawKeyboard from './recreate-page.js';
import * as Mobile from './mobile-key.js';

let onShift = false;
let onAlt = false;
let onCaps = false;
let onControl = false;

function handleLeftShift(b, e) {
  if (e.code === 'ShiftLeft' ) {
    onShift = b;

    if (!Mobile.onMobileControl && !onControl) redrawKeyboard(onCaps, onShift);

    if (b && onAlt && e.code === 'ShiftLeft') changeKeyboardLanguage(onCaps);
  }
}

function handleRightShift(b, e) {
  if (e.code === 'ShiftRight' ) {
    onShift = b;
    
    if(!Mobile.onMobileControl && !onControl) redrawKeyboard(onCaps, onShift);
  }
}

function handleCaps(e) {
    if (!(e.target.dataset.key === 'CapsLock' || e.code === 'CapsLock')) return

    onCaps = !onCaps;

    redrawKeyboard(onCaps, onShift)   
}

function handleLeftAlt(b) {
    onAlt = b;
}

function handleRightAlt(b) {
    onAlt = b;
}

function handleBackspace(e) {
    if (e.target.dataset.key !== 'Backspace') return
    const textArea = document.querySelector('.keyboard__text');
    if(!textArea.selectionStart) return
    let selectionStart = textArea.selectionStart;
    let textAreaValue = textArea.value.split('');
    textAreaValue.splice(selectionStart - 1, 1);

    textArea.value = textAreaValue.join('');
    selectionStart--
    textArea.setSelectionRange(selectionStart, selectionStart)
}

function handleDelete(e) {
    if (e.target.dataset.key !== 'Delete') return
    const textArea = document.querySelector('.keyboard__text');
    const selectionStart = textArea.selectionStart;

    let textAreaValue = textArea.value.split('');
    textAreaValue.splice(selectionStart, 1);

    textArea.value = textAreaValue.join('');
    textArea.setSelectionRange(selectionStart, selectionStart)
}

function handleLeftControl(b, e) {
  if(e.code === 'ControlLeft') {
    onControl = b;
  }  
}

function handleRightControl(b, e) {
  if(e.code === 'ControlRight') {
    onControl = b;
  } 
}


export { handleLeftShift, handleRightShift, handleCaps, handleLeftAlt, handleRightAlt, handleBackspace, handleDelete, handleLeftControl, handleRightControl, onShift, onCaps, onAlt, onControl }