import * as Special from './special-key.js'
import redrawKeyboard from './recreate-page.js'
import changeKeyboardLanguage from './language.js'
import enterText from './enter-text.js';

let onMobileShift = false;
let onMobileAlt = false;
let onMobileControl = false;

function handleMobileLeftShift(b, e, stop, password) {
  if(e?.target.dataset.key === 'ShiftLeft' || password) {

    if(onMobileAlt) {
      changeKeyboardLanguage(Special.onCaps);
      onMobileAlt = false;
    } else {
      onMobileShift = b;

      if(stop) return
      redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
    }
  }
}

function handleMobileRightShift(b, e) {
  if(e?.target.dataset.key === 'ShiftRight') {
    onMobileShift = b;
    
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }
}

function handleMobileLeftArrow(e) {
    if(e.target.dataset.key !== 'ArrowLeft') return;
    const textArea = document.querySelector('.keyboard__text');
    if(!textArea.value.length) return
    let selectionStart = textArea.selectionStart;

    if(onMobileControl && onMobileShift) {
      textArea.setSelectionRange(selectionStart, selectionStart);
      textArea.setSelectionRange(0, selectionStart);
      onMobileControl = false;
      handleMobileLeftShift(false, undefined, undefined, true);
      return
    }

    if(onMobileControl) {
      textArea.setSelectionRange(0, 0);
      onMobileControl = false;
      return
    }
    
    if(Special.onControl && Special.onShift) {
      textArea.setSelectionRange(selectionStart, selectionStart);
      textArea.setSelectionRange(0, selectionStart);
      return
    }
  
    if(Special.onControl) {
      textArea.setSelectionRange(0, 0);
      return
    }
  
    selectionStart--;
    textArea.setSelectionRange(selectionStart, selectionStart);
}
  
function handleMobileRightArrow(e) {
  if(e.target.dataset.key !== 'ArrowRight') return;
  const textArea = document.querySelector('.keyboard__text');
  if(!textArea.value.length) return
  let selectionStart = textArea.selectionStart;
  const textLength = textArea.value.split('').length;
  
  if(onMobileControl && onMobileShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(selectionStart, textLength);
    onMobileControl = false;
    handleMobileLeftShift(false, undefined, undefined, true)
    return
  }

  if(onMobileControl) {
    textArea.setSelectionRange(textLength, textLength);
    onMobileControl = false;  
    return
  }

  if(Special.onControl && Special.onShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(selectionStart, textLength);
    return
  }

  if(Special.onControl) {
    textArea.setSelectionRange(textLength, textLength);
    return
  }

  selectionStart++;
  textArea.setSelectionRange(selectionStart, selectionStart);

}
  
function handleMobileUpArrow(e) {
  if(e.target.dataset.key !== 'ArrowUp') return;
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart - textArea.cols;
  
  if(onMobileControl && onMobileShift) {
    textArea.setSelectionRange(0, textArea.selectionStart);
    onMobileControl = false;
    handleMobileLeftShift(false, undefined, undefined, true)
    return
  }

  if(Special.onControl || onMobileControl) {
    selectionStart = 0;
    onMobileControl = false;
  }

  textArea.setSelectionRange(selectionStart, selectionStart);
}
  
function handleMobileDownArrow(e) {
  if(e.target.dataset.key !== 'ArrowDown') return;
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart + textArea.cols;

  if(onMobileControl && onMobileShift) {
    textArea.setSelectionRange(textArea.selectionStart, textArea.value.split('').length);
    onMobileControl = false;
    handleMobileLeftShift(false, undefined, undefined, true);
    return
  }

  if(Special.onControl || onMobileControl) {
    selectionStart = textArea.value.split('').length;
    onMobileControl = false;
  }

  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleMobileLeftAlt(e) {
  if(e?.target.dataset.key === 'AltLeft') {
  onMobileAlt = true;
  }
}

function handleMobileRightAlt(e) {
  if(e?.target.dataset.key === 'AltRight') {
  onMobileAlt = true;
  }
}

function handleMobileLeftControl(e) {
  if(e?.target.dataset.key === 'ControlLeft') {
    onMobileControl = true;
  }
}

function handleMobileRightControl(e) {
  if(e?.target.dataset.key === 'ControlRight') {
    onMobileControl = true;
  }
}

function handleMobileEnter(e) {
  if (e.target.dataset.key !== 'Enter') return
  enterText('Enter');
}

function handleMobileTab(e) {
  if (e.target.dataset.key !== 'Tab') return
  enterText('Tab');
}

function handleMobileSpace(e) {
  if (e.target.dataset.key !== 'Space') return
  enterText('Space');
}

export { handleMobileLeftShift, handleMobileRightShift, handleMobileLeftAlt, handleMobileRightAlt, handleMobileLeftControl, handleMobileRightControl, handleMobileLeftArrow, handleMobileRightArrow, handleMobileUpArrow, handleMobileDownArrow, handleMobileEnter, handleMobileTab, handleMobileSpace, onMobileShift, onMobileAlt}