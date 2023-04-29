export function createElem(name, classes, content) {
  const element = document.createElement(name);
  if (Array.isArray(classes)) {
      classes.forEach(c => {
          element.classList.add(c)
      })
  } else {
      element.classList.add(classes)
  }

  if (content) element.textContent = content;

  return element
}