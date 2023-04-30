let onShift = false;
let onAlt = false;
let onCaps = false;

function handleShift(b) {
    onShift = b;
    // if(onAlt) changeKeyboardLanguage();
}

function handleCaps() {
    onCaps = !onCaps;
}

function handleAlt(b) {
    onAlt = b
}

export { handleShift, handleCaps, handleAlt, onShift, onCaps, onAlt }