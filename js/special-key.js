import { keyStates, changeKeyState } from './data.js';
import changeKeyboardLanguage from './language.js';
import redrawKeyboard from './recreate-page.js';

function handleLeftShift(b, e) {
  if (e.code === 'ShiftLeft') {
    changeKeyState('onShift', b);

    if (!keyStates.onMobileControl && !keyStates.onControl) redrawKeyboard();

    if (b && (keyStates.onAlt || keyStates.onMobileAlt) && e.code === 'ShiftLeft') {
      changeKeyState('onMobileAlt', false);
      changeKeyboardLanguage();
    }
  }
}

function handleRightShift(b, e) {
  if (e.code === 'ShiftRight') {
    changeKeyState('onShift', b);

    if (!keyStates.onMobileControl && !keyStates.onControl) redrawKeyboard();
  }
}

function handleCaps(e) {
  if (!(e.target.dataset.key === 'CapsLock' || e.code === 'CapsLock')) return;

  changeKeyState('onCaps', !keyStates.onCaps);

  redrawKeyboard();
}

function handleLeftAlt(b) {
  changeKeyState('onAlt', b);
}

function handleRightAlt(b) {
  changeKeyState('onAlt', b);
}

function handleBackspace(e) {
  if (e.target.dataset.key !== 'Backspace') return;
  const textArea = document.querySelector('.keyboard__text');
  if (!textArea.selectionStart) return;
  let { selectionStart } = textArea;
  const textAreaValue = textArea.value.split('');
  textAreaValue.splice(selectionStart - 1, 1);

  textArea.value = textAreaValue.join('');
  selectionStart -= 1;
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleDelete(e) {
  if (e.target.dataset.key !== 'Delete') return;
  const textArea = document.querySelector('.keyboard__text');
  const { selectionStart } = textArea;

  const textAreaValue = textArea.value.split('');
  textAreaValue.splice(selectionStart, 1);

  textArea.value = textAreaValue.join('');
  textArea.setSelectionRange(selectionStart, selectionStart);
}

function handleLeftControl(b, e) {
  if (e.code === 'ControlLeft') {
    changeKeyState('onControl', b);
  }
}

function handleRightControl(b, e) {
  if (e.code === 'ControlRight') {
    changeKeyState('onControl', b);
  }
}

export {
  handleLeftShift,
  handleRightShift,
  handleCaps,
  handleLeftAlt,
  handleRightAlt,
  handleBackspace,
  handleDelete,
  handleLeftControl,
  handleRightControl,
};
