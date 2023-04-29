import { createElem } from './create-elem.js';
import { createKeyboard } from './create-keyboard.js';

function initPage() {
    const body = document.querySelector('body');
    const page = createPage();

    console.log('pon')

    body.append(page);
}

function createPage() {
    const wrapper = createElem('div', 'keyboard-wrapper');
    const keyboard = createElem('div', 'keyboard');

    const keyboardHeaderWrapper = createElem('div', 'keyboard__header-theme');
    const keyboardHeader = createElem('h1', 'keyboard__header', 'Virtual keyboard');
    keyboardHeaderWrapper.append(keyboardHeader);

    const textArea = createElem('textarea', 'keyboard__text');
    textArea.name = 'text';

    const keyboardElement = createKeyboard();

    const keyboardHelpPartOne = createElem('p', 'keyboard__help-text', 'Клавиатура создана в операционной системе Windows 11');
    const keyboardHelpPartTwo = createElem('p', 'keyboard__help-text', 'Переключение языка ввода: левые Alt + Shift');

    keyboard.append(keyboardHeaderWrapper, textArea, keyboardElement, keyboardHelpPartOne, keyboardHelpPartTwo);
    wrapper.append(keyboard);

    return wrapper
}

export { initPage }
