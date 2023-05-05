import * as Data from './data.js';
import redrawKeyboard from './recreate-page.js';

function checkSymbolKey(keyName) {
  const language = window.localStorage.getItem('language');

  return Data.noCapsKeys[language].includes(keyName);
}

function upShift() {
  Data.changeKeyState('onMobileShift', false);
  redrawKeyboard();
}

export default function enterText(keyName) {
  if (Data.keyStates.onControl || Data.keyStates.onMobileControl) return;
  const keyData = (Data.keysDataContent[keyName])
    ? Data.keysDataContent[keyName] : Data.spaceContents[keyName];
  const textArea = document.querySelector('.keyboard__text');
  const language = window.localStorage.getItem('language');
  let enterStart = textArea.selectionStart;
  let enterIndex = (Data.keyStates.onCaps && !checkSymbolKey(keyName)) ? 1 : 0;
  if (Data.keyStates.onShift || Data.keyStates.onMobileShift) enterIndex = +(!enterIndex);
  const enterContent = keyData[language][enterIndex];
  let newValue;

  if (textArea.value === '') {
    textArea.value += enterContent;
    enterStart += 1;
  } else {
    const textStr = textArea.value;
    const textArrPartOne = textStr.slice(0, enterStart).split('');

    const textArrPartTwo = textStr.slice(enterStart).split('');
    textArrPartOne.push(enterContent);
    newValue = textArrPartOne.concat(textArrPartTwo).join('');
    textArea.value = newValue;
    enterStart += 1;
  }

  textArea.textContent = textArea.value;
  textArea.setSelectionRange(enterStart, enterStart);
  upShift();
}
