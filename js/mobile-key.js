import * as Special from './special-key.js'
import redrawKeyboard from './recreate-page.js'
import changeKeyboardLanguage from './language.js'

let onMobileShift = false;
let onMobileAlt = false;
let onMobileControl = false;

function handleMobileLeftShift(b, e, stop, password) {
  if(e?.target.dataset.key === 'ShiftLeft' || password) {

    if(onMobileAlt) {
      changeKeyboardLanguage(Special.onCaps);
      onMobileAlt = false;
    } else {
      onMobileShift = b;

      if(stop) return
      redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
    }
  }
  }

function handleMobileRightShift(b, e) {
  if(e?.target.dataset.key === 'ShiftRight') {
    onMobileShift = b;
    
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }
  }

function handleMobileLeftAlt(e) {
  if(e?.target.dataset.key === 'AltLeft') {
  onMobileAlt = true;
  }
}

function handleMobileRightAlt(e) {
  if(e?.target.dataset.key === 'AltRight') {
  onMobileAlt = true;
  }
}

function handleMobileLeftControl(e) {
  if(e?.target.dataset.key === 'ControlLeft') {
  onMobileControl = true;
  }
}

function handleMobileRightControl(e) {
  if(e?.target.dataset.key === 'ControlRight') {
  onMobileControl = true;
  }
}

export { handleMobileLeftShift, handleMobileRightShift, handleMobileLeftAlt, handleMobileRightAlt, handleMobileLeftControl, handleMobileRightControl, onMobileShift, onMobileAlt}