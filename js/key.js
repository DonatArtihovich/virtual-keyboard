import * as Data from './data.js';
import * as Special from './special-key.js';
import * as Mobile from './mobile-key.js';
import enterText from './enter-text.js';

function handleSpecialKey(key, e) {
  switch (key) {
    case 'Space':
      Mobile.handleMobileSpace(e);
      break;
    case 'Tab':
      Mobile.handleMobileTab(e);
      break;
    case 'Enter':
      Mobile.handleMobileEnter(e);
      break;
    case 'CapsLock':
      Special.handleCaps(e);
      break;
    case 'Backspace':
      Special.handleBackspace(e);
      break;
    case 'Delete':
      Special.handleDelete(e);
      break;
    case 'ArrowLeft':
      Mobile.handleMobileLeftArrow(e);
      break;
    case 'ArrowRight':
      Mobile.handleMobileRightArrow(e);
      break;
    case 'ArrowUp':
      Mobile.handleMobileUpArrow(e);
      break;
    case 'ArrowDown':
      Mobile.handleMobileDownArrow(e);
      break;
    case 'ShiftLeft':
      Mobile.handleMobileLeftShift(true, e);
      break;
    case 'ShiftRight':
      Mobile.handleMobileRightShift(e);
      break;
    case 'AltLeft':
      Mobile.handleMobileLeftAlt(e);
      break;
    case 'AltRight':
      Mobile.handleMobileRightAlt(e);
      break;
    case 'ControlRight':
      Mobile.handleMobileRightControl(e);
      break;
    case 'ControlLeft':
      Mobile.handleMobileLeftControl(e);
      break;
    default:
  }
}

function handleKeyDown(event, b) {
  switch (event.code) {
    case 'ShiftLeft':
      Special.handleLeftShift(b, event);
      break;
    case 'ShiftRight':
      Special.handleRightShift(b, event);
      break;
    case 'AltLeft':
      Special.handleLeftAlt(b);
      break;
    case 'AltRight':
      Special.handleRightAlt(b);
      break;
    case 'CapsLock':
      if (event.type !== 'keyup') Special.handleCaps(event);
      break;
    case 'ControlLeft':
      Special.handleLeftControl(b, event);
      break;
    case 'ControlRight':
      Special.handleRightControl(b, event);
      break;
    default:
  }
}

function handleVirtualKey(event) {
  if (!event.target.classList.contains('keyboard__key')) return;
  const { onShift } = Special;
  const { onMobileShift } = Mobile;
  const { onCaps } = Special;
  const { onControl } = Special;
  const { onMobileControl } = Mobile;
  const keyName = event.target.dataset.key;

  if (Data.keysDataContent[keyName]) {
    enterText(keyName, onShift, onCaps, onMobileShift, onControl, onMobileControl);
  } else {
    handleSpecialKey(keyName, event);
  }
}

export default function addKeyEvents() {
  const keyboard = document.querySelector('.keyboard__keys');

  keyboard.addEventListener('click', (e) => { handleVirtualKey(e); });
  window.addEventListener('keydown', (e) => { handleKeyDown(e, true); });
  window.addEventListener('keyup', (e) => { handleKeyDown(e, false); });
}
