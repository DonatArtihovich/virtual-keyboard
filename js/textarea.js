export function saveTextFocus() {
  const textArea = document.querySelector('.keyboard__text');
  textArea.addEventListener('blur', () => { textArea.focus(); });
}

export function preventMobileKeyboard() {
  const textArea = document.querySelector('.keyboard__text');
  textArea.addEventListener('focus', e => { e.preventDefault() });
}