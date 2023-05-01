import * as Special from './special-key.js'
import redrawKeyboard from './recreate-page.js'

export let onMobileShift = false;

export function handleMobileLeftShift(b, e, stop, password) {
  if(e?.target.dataset.key === 'ShiftLeft' || password) {
    onMobileShift = b;
    console.log('m')
    if(stop) return
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }
  }

export function handleMobileRightShift(b, e) {
  if(e?.target.dataset.key === 'ShiftRight') {
    onMobileShift = b;
    
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }
  }