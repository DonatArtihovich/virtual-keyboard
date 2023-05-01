import * as Data from './data.js';
import * as Mobile from './mobile-key.js';
export default function enterText(keyName, onShift, onCaps, onMobileShift) {
    const keyData = (Data.keysDataContent.hasOwnProperty(keyName))? Data.keysDataContent[keyName] : Data.spaceContents[keyName]
    const textArea = document.querySelector('.keyboard__text');
    const language = window.localStorage.getItem('language');
    let enterStart = textArea.selectionStart;
    let enterIndex = (onCaps && !checkKeyChild(keyName))? 1 : 0;
    if (onShift || onMobileShift) enterIndex = +(!enterIndex);
    
    let enterContent = keyData[language][enterIndex];
    let newValue;

    if (textArea.value === '') {
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

    Mobile.handleMobileLeftShift(false)
    console.log(onMobileShift)
}

function checkKeyChild(keyName) {
    const language = window.localStorage.getItem('language');
    const key = document.querySelector(`[data-key = ${ keyName }]`);
    const keysList = document.querySelectorAll('.keyboard__key');
    for(let i = 0; i < keysList.length; i++) { 
        if (keysList[i].dataset.key === keyName && ((i > 0 && i < 14) || (language === 'en' && i < 14))) return true
    }
    return (key.children.length > 0)? true : false
}