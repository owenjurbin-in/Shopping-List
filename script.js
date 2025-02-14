const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')
const items = itemList.querySelectorAll('li')

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

    // Adding an li to the DOM
    itemList.appendChild(li)
    isEmptyList()
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

function removeItem(e) {
    if (e.target.tagName === 'I') {
            e.target.parentElement.parentElement.remove()
    }
}

function clearList() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
}

function isEmptyList() {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', isEmptyList)
clearBtn.addEventListener('click', clearList)
clearBtn.addEventListener('click', isEmptyList)


isEmptyList()