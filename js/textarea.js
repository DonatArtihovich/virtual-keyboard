export default function saveTextFocus() {
  const textArea = document.querySelector('.keyboard__text');
  textArea.addEventListener('blur', () => { textArea.focus(); });
}
