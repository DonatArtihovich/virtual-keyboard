export default function saveTextFocus () {
    const textArea = document.querySelector('.keyboard__text')
    textArea.addEventListener('blur', e => {
        textArea.focus() 
    })
}