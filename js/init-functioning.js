import addBasicFunctioning from './click.js';
import { saveTextFocus, preventMobileKeyboard } from './textarea.js';
import addKeyEvents from './key.js';

export default function initFunctioning() {
  addBasicFunctioning();
  saveTextFocus();
  preventMobileKeyboard();
  addKeyEvents();
}
