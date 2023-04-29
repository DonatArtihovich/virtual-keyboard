import { createElem } from './create-elem.js'
import * as Data from './data.js'


function createKeyboard() {
    const keysContainer = createElem('div', 'keyboard__keys');
    for (let i = 0; i < Data.keysArr.length; i++) {
        const key = createKey(i);
        keysContainer.append(key)
    }

    return keysContainer
}

function createKey(index) {
    const keyClasslist = getKeyClasslist(index);
    const keyContent = getKeyContent(index);
    const key = createElem('button', keyClasslist, keyContent);
    key.dataset.key = Data.keysArr[index];
    
    if(index < 13 && index > 0) {
        const keySpan = createElem('span', 'up-content', Data.keysDataContent[Data.keysArr[index]]['ru'][1]);
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

function getKeyContent(index) {
    const key = Data.keysArr[index];
    const keyContent = (Data.keysDataContent.hasOwnProperty(key)) ? Data.keysDataContent[key]['ru'][0] : Data.keysSpecialDataContent[key]
    return keyContent
}

export { createKeyboard }