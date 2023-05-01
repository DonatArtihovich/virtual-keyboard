import * as Special from './special-key.js'
import redrawKeyboard from './recreate-page.js'

export let onMobileShift = false;

export function handleMobileLeftShift(b, e, stop) {
  if(e?.target.dataset.key === 'CapsLock') return
    onMobileShift = b;
    
    if(stop) return
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }

export function handleMobileRightShift(b, e) {
  if(e?.target.dataset.key === 'CapsLock') return
    onMobileShift = b;
    
    redrawKeyboard(Special.onCaps, Special.onShift, onMobileShift);
  }