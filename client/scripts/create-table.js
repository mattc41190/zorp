const createTable = function createTable(container, title, items){
  console.log(items);
  if (items.files) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    const h2 = document.createElement('h2')
    h2.innerHTML = title
    container.appendChild(h2)
    const table = document.createElement('table')
    for (let file in items.files) {
      const tr = document.createElement('tr')
      const titleCell = document.createElement('td')
      const scoreCell = document.createElement('td')
      titleCell.innerHTML = items.files[file].title
      scoreCell.innerHTML = items.files[file].score
      tr.appendChild(titleCell)
      tr.appendChild(scoreCell)
      table.appendChild(tr)
    }
    container.appendChild(table)
  }
}

module.exports = createTable