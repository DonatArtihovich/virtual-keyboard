import createElem from './create-elem.js'
import * as Data from './data.js'


export default function createKeyboard() {
    const keysContainer = createElem('div', 'keyboard__keys');
    const myStorage = window.localStorage;
    if(!myStorage.getItem('language')) myStorage.setItem('language', 'ru')
    const keyLanguage = myStorage.getItem('language');

    for (let i = 0; i < Data.keysArr.length; i++) {
        const key = createKey(i, keyLanguage);
        keysContainer.append(key)
    }

    return keysContainer
}

function createKey(index, lang) {
    const keyClasslist = getKeyClasslist(index);
    const keyContent = getKeyContent(index, lang);
    const key = createElem('button', keyClasslist, keyContent);
    key.dataset.key = Data.keysArr[index];
    
    if(index < 13 && index > 0) {
        const keySpan = createElem('span', 'up-content', Data.keysDataContent[Data.keysArr[index]][lang][1]);
        key.prepend(keySpan)
    }
   
    return key
}

function getKeyClasslist(index) {
    const key = Data.keysArr[index];
    let classesArr = ['keyboard__key'];
    if (!Data.keysDataContent.hasOwnProperty(key)) {
        classesArr.push('special-key');
        if (Data.doubleKeysArr.includes(key)) {
            classesArr.push('double-key');
        } else if (key === 'Space') classesArr.push('space-key');
    }

    classesArr = (classesArr.length > 1) ? classesArr : classesArr[0];

    return classesArr
}

function getKeyContent(index, lang) {
    const key = Data.keysArr[index];
    const keyContent = (Data.keysDataContent.hasOwnProperty(key)) ? Data.keysDataContent[key][lang][0] : Data.keysSpecialDataContent[key]
    return keyContent
}