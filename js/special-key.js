import changeKeyboardLanguage from './language.js'
import redrawKeyboard from './recreate-page.js'
import enterText from './enter-text.js'

let onShift = false;
let onAlt = false;
let onCaps = false;

function handleShift(b, isLeft, e) {
  if (e.target.dataset.key === 'ShiftLeft' || e.target.dataset.key === 'ShiftRight' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    onShift = b;
    console.log(onShift)
    if(b && onAlt && isLeft) {
        changeKeyboardLanguage();
    }
    
    redrawKeyboard(onShift, onShift)
  }
}

function handleCaps(e) {
    if (e.target.dataset.key === 'CapsLock' || e.code === 'CapsLock') {
    onCaps = !onCaps;
    redrawKeyboard(onCaps)
  } else return
   
}

function handleAlt(b, e) {
  if (e.target.dataset.key === 'CapsLock' || e.code === 'CapsLock') {
    onAlt = b;
  }
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

function handleEnter(e) {
  if (e.target.dataset.key !== 'Enter') return
  enterText('Enter');
}

function handleTab(e) {
  if (e.target.dataset.key !== 'Tab') return
  enterText('Tab');
}

function handleSpace(e) {
  if (e.target.dataset.key !== 'Space') return
  enterText('Space');
}

export { handleShift, handleCaps, handleAlt, handleBackspace, handleDelete, handleEnter, handleTab, handleSpace, onShift, onCaps, onAlt }