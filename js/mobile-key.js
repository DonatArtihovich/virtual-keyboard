import { keyStates, changeKeyState } from './data.js';
import redrawKeyboard from './recreate-page.js';
import changeKeyboardLanguage from './language.js';

function handleMobileShift(e) {
  if (keyStates.onMobileAlt && e?.target.dataset.key === 'ShiftLeft') {
    changeKeyboardLanguage();
    changeKeyState('onMobileAlt', false);
  } else {
    changeKeyState('onMobileShift', !keyStates.onMobileShift);

    if (keyStates.onMobileControl || keyStates.onControl) return;
    redrawKeyboard();
  }
}

function handleMobileLeftArrow() {
  const textArea = document.querySelector('.keyboard__text');
  if (!textArea.value.length) return;
  let { selectionStart } = textArea;
  if (!selectionStart) return;

  if (keyStates.onMobileControl && keyStates.onMobileControl) {
    if (keyStates.onMobileShift || keyStates.onControl) {
      if (keyStates.onMobileShift || keyStates.onShift) {
        textArea.setSelectionRange(selectionStart, selectionStart);
        textArea.setSelectionRange(0, selectionStart);
        changeKeyState('onMobileControl', false);
        changeKeyState('onMobileShift', false);
        return;
      }
    }
  }

  if (keyStates.onMobileControl) {
    textArea.setSelectionRange(0, 0);
    changeKeyState('onMobileControl', false);
    return;
  }

  if (keyStates.onControl && keyStates.onShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(0, selectionStart);
    return;
  }

  if (keyStates.onControl) {
    textArea.setSelectionRange(0, 0);
    return;
  }

  selectionStart -= 1;
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleMobileRightArrow() {
  const textArea = document.querySelector('.keyboard__text');
  if (!textArea.value.length) return;
  let { selectionStart } = textArea;
  const textLength = textArea.value.split('').length;

  if (keyStates.onMobileControl && keyStates.onMobileControl) {
    if (keyStates.onMobileShift || keyStates.onControl) {
      if (keyStates.onMobileShift || keyStates.onShift) {
        textArea.setSelectionRange(selectionStart, selectionStart);
        textArea.setSelectionRange(selectionStart, textLength);
        changeKeyState('onMobileControl', false);
        changeKeyState('onMobileShift', false);
        return;
      }
    }
  }

  if (keyStates.onMobileControl) {
    textArea.setSelectionRange(textLength, textLength);
    changeKeyState('onMobileControl', false);
    return;
  }

  if (keyStates.onControl && keyStates.onShift) {
    textArea.setSelectionRange(selectionStart, selectionStart);
    textArea.setSelectionRange(selectionStart, textLength);
    return;
  }

  if (keyStates.onControl) {
    textArea.setSelectionRange(textLength, textLength);
    return;
  }

  selectionStart += 1;
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleMobileUpArrow() {
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart - textArea.cols;

  if (keyStates.onMobileControl && keyStates.onMobileShift) {
    textArea.setSelectionRange(0, textArea.selectionStart);
    changeKeyState('onMobileControl', false);
    changeKeyState('onMobileShift', false);
    return;
  }

  if (keyStates.onControl || keyStates.onMobileControl) {
    selectionStart = 0;
    changeKeyState('onMobileControl', false);
  }

  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleMobileDownArrow() {
  const textArea = document.querySelector('.keyboard__text');
  let selectionStart = textArea.selectionStart + textArea.cols;

  if (keyStates.onMobileControl && keyStates.onMobileShift) {
    textArea.setSelectionRange(textArea.selectionStart, textArea.value.split('').length);
    changeKeyState('onMobileControl', false);
    changeKeyState('onMobileShift', false);
    return;
  }

  if (keyStates.onControl || keyStates.onMobileControl) {
    selectionStart = textArea.value.split('').length;
    changeKeyState('onMobileControl', false);
  }

  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleMobileControl() {
  changeKeyState('onMobileControl', !keyStates.onMobileControl);
  changeKeyState('onMobileShift', false);
}

export {
  handleMobileShift,
  handleMobileControl,
  handleMobileLeftArrow,
  handleMobileRightArrow,
  handleMobileUpArrow,
  handleMobileDownArrow,
};
