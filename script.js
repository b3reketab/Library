const addBtn = document.querySelector('#add')
const bookDialog = document.querySelector('#bkdlg')
const subBtn = bookDialog.querySelector('#submit')
const title = bookDialog.querySelector('#title')
const author = bookDialog.querySelector('#author')
const select = bookDialog.querySelector('select')
const bookShelf = document.querySelector('.card-container')
const myBooks = []
const input = []
let i = 0

class Book {
    constructor(title, author, read) {
        this.title = title
        this.author = author
        this.read = read
    }
    
    info() {
        return `Title: ${this.title}<br>
                Author: ${this.author}<br>
                Read: ${this.read}`
    }
}

function display() {
    if(bookDialog.returnValue === 'cancel') {
        return
    }
    const card = document.createElement('div')
    const red = document.createElement('button')
    const del = document.createElement('button')
    const para = document.createElement('p')
    red.textContent = 'Read Status'
    del.textContent = 'delete'
    card.classList.add(`${i}`)

    myBooks[i] = new Book(...input)
    para.innerHTML = myBooks[i].info()  
    del.addEventListener('click', () => {
        delete myBooks[card.className]
        bookShelf.removeChild(card)
    })
    red.addEventListener('click', () => {
        myBooks[card.className].read === 'Read' 
            ? myBooks[card.className].read = 'Not yet' 
            : myBooks[card.className].read = 'Read'
        para.innerHTML = myBooks[card.className].info()
    })
    bookShelf.appendChild(card)
    card.appendChild(para)
    card.appendChild(red)
    card.appendChild(del)

    i++
}

title.addEventListener('change', (e) => {
    input[0] = title.value
})
author.addEventListener('change', (e) => {
    input[1] = author.value
})
select.addEventListener('change', (e) => {
    input[2] = select.value
})
addBtn.addEventListener('click', () => {
    bookDialog.showModal()
})
subBtn.addEventListener('click', (event) => {
    event.preventDefault()
    bookDialog.close(display)
})
bookDialog.addEventListener('close', display)