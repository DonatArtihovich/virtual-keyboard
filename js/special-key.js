import changeKeyboardLanguage from './language.js'
import redrawKeyboard from './recreate-page.js'
import enterText from './enter-text.js'

let onShift = false;
let onAlt = false;
let onCaps = false;

function handleLeftShift(b, e) {
  if (e.code === 'ShiftLeft' ) {
    onShift = b;
    
    redrawKeyboard(onShift, onShift);

    if(b && onAlt && e.code === 'ShiftLeft') {
        changeKeyboardLanguage();
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
    if (e.target.dataset.key === 'CapsLock' || e.code === 'CapsLock') {
    onCaps = !onCaps;
    redrawKeyboard(onCaps)
  } else return
   
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

function handleSideArrow(e) {
  if(e.target.dataset.key !== 'ArrowRight' && e.target.dataset.key !== 'ArrowLeft') return
  const textArea = document.querySelector('.keyboard__text');
  if(!textArea.value.length) return
  let selectionStart = textArea.selectionStart;

  console.log('target: ', e.target, '\n', 'code: ', e.code)
  if(e.target.dataset.key === 'ArrowRight') {
    selectionStart += 1;
  } else if(e.target.dataset.key === 'ArrowLeft') {
    if(!selectionStart) return
    selectionStart--;
  }
  
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleVerticalArrow() {

}


export { handleLeftShift, handleRightShift, handleCaps, handleLeftAlt, handleRightAlt, handleBackspace, handleDelete, handleEnter, handleTab, handleSpace, handleSideArrow, handleVerticalArrow, onShift, onCaps, onAlt }