import changeKeyboardLanguage from './language.js'
import recreatePage from './recreate-page.js'

let onShift = false;
let onAlt = false;
let onCaps = false;

function handleShift(b, isLeft) {
    onShift = b;
    if(b && onAlt && isLeft) {
        console.log(event.type, onShift, onAlt)
        changeKeyboardLanguage();
    }
}

function handleCaps() {
    onCaps = !onCaps;
    recreatePage(onCaps)
}

function handleAlt(b) {
    onAlt = b
}

function handleBackspace() {
    const textArea = document.querySelector('.keyboard__text');
    if(!textArea.selectionStart) return
    let selectionStart = textArea.selectionStart;
    let textAreaValue = textArea.value.split('');
    textAreaValue.splice(selectionStart - 1, 1);

    textArea.value = textAreaValue.join('');
    selectionStart--
    textArea.setSelectionRange(selectionStart, selectionStart)
}

function handleDelete() {
    const textArea = document.querySelector('.keyboard__text');
    const selectionStart = textArea.selectionStart;

    let textAreaValue = textArea.value.split('');
    textAreaValue.splice(selectionStart, 1);

    textArea.value = textAreaValue.join('');
    textArea.setSelectionRange(selectionStart, selectionStart)
}

export { handleShift, handleCaps, handleAlt, handleBackspace, handleDelete, onShift, onCaps, onAlt }