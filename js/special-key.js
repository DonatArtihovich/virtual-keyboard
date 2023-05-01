import changeKeyboardLanguage from './language.js'
import redrawKeyboard from './recreate-page.js'
import enterText from './enter-text.js'

let onShift = false;
let onAlt = false;
let onCaps = false;
let onControl = false;
let onMobileShift = false;

function handleLeftShift(b, e) {
  if (e.code === 'ShiftLeft' ) {
    onShift = b;
    
    redrawKeyboard(onCaps, onShift);

    if(b && onAlt && e.code === 'ShiftLeft') {
        changeKeyboardLanguage(onCaps);
    }
  }
}

function handleRightShift(b, e) {
  if (e.code === 'ShiftRight' ) {
    onShift = b;
    
    redrawKeyboard(onShift, onShift);
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

function handleLeftControl(b) {
  onControl = b;
}

function handleRightControl(b) {
  onControl = b;
}

function handleLeftArrow(e) {
  if(e.target.dataset.key !== 'ArrowLeft') return;
  const textArea = document.querySelector('.keyboard__text');
  if(!textArea.value.length) return
  let selectionStart = textArea.selectionStart;
  
  if(onControl && onShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(0, selectionStart);
    return
  }

  if(onControl) {
    textArea.setSelectionRange(0, 0);
    return
  }

  selectionStart--;
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleRightArrow(e) {
  if(e.target.dataset.key !== 'ArrowRight') return;
  const textArea = document.querySelector('.keyboard__text');
  if(!textArea.value.length) return
  let selectionStart = textArea.selectionStart;
  const textLength = textArea.value.split('').length;
  
  if(onControl && onShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(selectionStart, textLength);
    return
  }

  if(onControl) {
    textArea.setSelectionRange(textLength, textLength);
    return
  }

  selectionStart++;
  textArea.setSelectionRange(selectionStart, selectionStart);

}

function handleUpArrow(e) {
  if(e.target.dataset.key !== 'ArrowUp') return;
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart - textArea.cols;
  
  if(onControl) selectionStart = 0;

  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleDownArrow(e) {
  if(e.target.dataset.key !== 'ArrowDown') return;
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart + textArea.cols;

  if(onControl) selectionStart = textArea.value.split('').length;

  textArea.setSelectionRange(selectionStart, selectionStart);
}


export { handleLeftShift, handleRightShift, handleCaps, handleLeftAlt, handleRightAlt, handleBackspace, handleDelete, handleEnter, handleTab, handleSpace, handleLeftArrow, handleRightArrow, handleUpArrow, handleDownArrow, handleLeftControl, handleRightControl, onMobileShift, onShift, onCaps, onAlt }