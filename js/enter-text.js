import * as Data from './data.js';

export default function enterText(keyName, onShift, onCaps) {
    const keyData = Data.keysDataContent[keyName];
    const textArea = document.querySelector('.keyboard__text');
    const language = window.localStorage.getItem('language');
    let enterStart = textArea.selectionStart;
    let enterIndex = (onShift || (onCaps && !checkKeyChild(keyName))) ? 1 : 0;
    let enterContent = keyData[language][enterIndex];
    let newValue;
    if(checkKeyChild(keyName)) enterIndex = 0;
    if(textArea.value === '') {
        textArea.value += enterContent
        enterStart++;
    } else {
        let textStr = textArea.value;
        let textArrPartOne = textStr.slice(0, enterStart).split('');
        
        let textArrPartTwo = textStr.slice(enterStart).split('');
        textArrPartOne.push(enterContent)
        newValue = textArrPartOne.concat(textArrPartTwo).join('');
        textArea.value = newValue;
        enterStart++
    }
    
    textArea.textContent = textArea.value;
    textArea.setSelectionRange(enterStart, enterStart);
}

function checkKeyChild(keyName) {
    const key = document.querySelector(`[data-key = ${ keyName }]`);
    console.log(key.children.length? true : false)
    return key.children.length? true : false
}