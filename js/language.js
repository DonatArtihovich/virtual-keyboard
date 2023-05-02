import redrawKeyboard from './recreate-page.js';

export default function changeKeyboardLanguage() {
  const myStorage = window.localStorage;
  const curLang = myStorage.getItem('language');
  const changedLang = (curLang === 'en') ? 'ru' : 'en';

  myStorage.removeItem('language');
  myStorage.setItem('language', changedLang);

  redrawKeyboard();
}
