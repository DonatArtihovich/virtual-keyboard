import { keyStates, changeKeyState } from './data.js';
import changeKeyboardLanguage from './language.js';
import redrawKeyboard from './recreate-page.js';

function handleShift(b, e) {
  changeKeyState('onShift', b);

  if (!keyStates.onMobileControl && !keyStates.onControl) redrawKeyboard();

  if (b && (keyStates.onAlt || keyStates.onMobileAlt) && e.code === 'ShiftLeft') {
    changeKeyState('onMobileAlt', false);
    changeKeyboardLanguage();
  }
}

function handleCaps() {
  changeKeyState('onCaps', !keyStates.onCaps);
  redrawKeyboard();
}

function handleBackspace() {
  const textArea = document.querySelector('.keyboard__text');
  if (!textArea.selectionStart) return;
  let { selectionStart } = textArea;
  const textAreaValue = textArea.value.split('');
  textAreaValue.splice(selectionStart - 1, 1);

  textArea.value = textAreaValue.join('');
  selectionStart -= 1;
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleDelete() {
  const textArea = document.querySelector('.keyboard__text');
  const { selectionStart } = textArea;

  const textAreaValue = textArea.value.split('');
  textAreaValue.splice(selectionStart, 1);

  textArea.value = textAreaValue.join('');
  textArea.setSelectionRange(selectionStart, selectionStart);
}

export {
  handleShift,
  handleCaps,
  handleBackspace,
  handleDelete,
};
