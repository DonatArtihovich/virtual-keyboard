import * as Data from './data.js';
import * as Mobile from './mobile-key.js';

function checkKeyChild(keyName) {
  const language = window.localStorage.getItem('language');
  const key = document.querySelector(`[data-key = ${keyName}]`);
  const keysList = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < keysList.length; i += 1) {
    if (keysList[i].dataset.key === keyName && ((i > 0 && i < 14) || (language === 'en' && i < 14))) return true;
  }
  return (key.children.length > 0);
}

export default function enterText(
  keyName,
  onShift,
  onCaps,
  onMobileShift,
  onControl,
  onMobileControl,
) {
  if (onControl || onMobileControl) return;
  const keyData = (Data.keysDataContent.hasOwnProperty(keyName))
    ? Data.keysDataContent[keyName] : Data.spaceContents[keyName];
  const textArea = document.querySelector('.keyboard__text');
  const language = window.localStorage.getItem('language');
  let enterStart = textArea.selectionStart;
  let enterIndex = (onCaps && !checkKeyChild(keyName)) ? 1 : 0;
  if (onShift || onMobileShift) enterIndex = +(!enterIndex);
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

  Mobile.handleMobileLeftShift(false, undefined, undefined, true);
}
