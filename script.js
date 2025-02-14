const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')
const items = itemList.querySelectorAll('li')
const formBtn = itemForm.querySelector('button')
let isEditMode = false 

const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item =>  addItemtoDOM(item))
}


const onSubmitAddItem = (e) => {
    e.preventDefault()

    const newItem = itemInput.value
    // Validate Input

    if (newItem === '') {
        alert('Please add an item')
        return
    }
    // add item to the DOM
    addItemtoDOM(newItem)
    // add item to local storage 
    addItemToStorage(newItem)
    isEmptyList()
    itemInput.value = ''
}

function addItemtoDOM(item) {
    // adding the li to the DOM
    const li = document.createElement('li')
    li.className = 'item'
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    li.appendChild(button)

    // Adding an li to the DOM
    itemList.appendChild(li)
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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()

    // add new item to our array 
    itemsFromStorage.push(item)
    // Convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items')) 
    }
    return itemsFromStorage

}

const onClickListItem = ((e) => {
    if (e.target.tagName === 'I') {
        removeItem(e.target.parentElement.parentElement)
    }
})
//     } else {
//         setItemToEdit(e.target)
//     }
// })

// function setItemToEdit(item) {
//     isEditMode = true
//     // turn 
//     itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

//     item.classList.add('edit-mode')
//     formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
//     formBtn.style.backgroundColor = '#228b22'
//     itemInput.value = item.textContent
// }

const removeItem = ((item) => {
        // remove item from DOM 
        item.remove()
        // remove item from storage 
        removeItemFromStorage(item.textContent)
})

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()
    
    // filter out items to be removed 
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
    // reset to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearList() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    // clearing from localStorage 
    localStorage.clear()
}

function filterItems (e) {
    const text = e.target.value.toLowerCase()
    const items = itemList.querySelectorAll('li')

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (itemName.indexOf(text) != -1 ) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })

    console.log(text)
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

function init() {
    document.addEventListener('DOMContentLoaded', displayItems)
    document.addEventListener('DOMContentLoaded', isEmptyList)
}


// Event Listeners
itemForm.addEventListener('submit', onSubmitAddItem)
itemList.addEventListener('click', onClickListItem)
itemList.addEventListener('click', isEmptyList)
clearBtn.addEventListener('click', clearList)
clearBtn.addEventListener('click', isEmptyList)
filter.addEventListener('input', filterItems)


init()