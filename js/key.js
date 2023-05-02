import * as Data from './data.js';
import * as Special from './special-key.js';
import * as Mobile from './mobile-key.js';
import enterText from './enter-text.js';

function handleSpecialKey(key, e) {
  switch (key) {
    case 'Space':
      enterText('Space');
      break;
    case 'Tab':
      enterText('Space');
      break;
    case 'Enter':
      enterText('Enter');
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
      Mobile.handleMobileLeftArrow();
      break;
    case 'ArrowRight':
      Mobile.handleMobileRightArrow();
      break;
    case 'ArrowUp':
      Mobile.handleMobileUpArrow();
      break;
    case 'ArrowDown':
      Mobile.handleMobileDownArrow();
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      Mobile.handleMobileShift(e);
      break;
    case 'AltLeft':
    case 'AltRight':
      Data.changeKeyState('onMobileAlt', !Data.keyStates.onAlt);
      break;
    case 'ControlRight':
    case 'ControlLeft':
      Mobile.handleMobileControl();
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
  const keyName = event.target.dataset.key;

  if (Data.keysDataContent[keyName]) {
    enterText(keyName);
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
