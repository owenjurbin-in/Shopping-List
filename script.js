const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

const addItem = (e) => {
    e.preventDefault()

    const newItem = itemInput.value
    // Validate Input

    if (newItem === '') {
        alert('Please add an item')
        return
    }
    // Create list item 
    const li = document.createElement('li')
    li.className = 'item'
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')

    button.appendChild(icon)
    li.appendChild(button)
    // document.querySelector('ul').appendChild(li)
    itemList.appendChild(li)
    itemInput.value = ''
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes 
    return button
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
