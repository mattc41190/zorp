const createList = function createList(container, title, items){
  if (items.files) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    const h2 = document.createElement('h2')
    h2.innerHTML = title
    container.appendChild(h2)
    const ul = document.createElement('ul')
    for (let file in items.files) {
      const li = document.createElement('li')
      li.innerHTML = items.files[file].title
      ul.appendChild(li)
    }
    container.appendChild(ul)
  }
}

module.exports = createList