const addBtn = document.querySelector('#add')
const bookDialog = document.querySelector('#bkdlg')
const subBtn = bookDialog.querySelector('#submit')
const title = bookDialog.querySelector('#title')
const author = bookDialog.querySelector('#author')
const select = bookDialog.querySelector('select')
const bookShelf = document.querySelector('.card-container')
const myBooks = []
const input = []
let i = -1

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
    if(bookDialog.returnValue !== 'cancel') {
        i++
    }
})

bookDialog.addEventListener('close', display)

subBtn.addEventListener('click', (event) => {
    event.preventDefault()
    bookDialog.close(display)
})

function Book(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
}

function addBooks() {
    myBooks[i] = new Book(...input)
}

function display() {
    if(bookDialog.returnValue === 'cancel') {
        return
    }

    addBooks()

    const card = document.createElement('div')
    const red = document.createElement('button')
    const del = document.createElement('button')
    const para = document.createElement('p')
    red.setAttribute('id', `${i}`)
    red.textContent = 'Read Status'
    del.setAttribute('class', `${i}`)
    del.textContent = 'delete'
     
    para.innerHTML = `Title: ${myBooks[i].title}<br>
                Author: ${myBooks[i].author}<br>
                Read: ${myBooks[i].read}`
    
    del.addEventListener('click', () => {
        delete myBooks[del.className]
        bookShelf.removeChild(card)
    })

    red.addEventListener('click', () => {
            myBooks[red.id].read === 'Read' 
                ? myBooks[red.id].read = 'Not yet' 
                : myBooks[red.id].read = 'Read'
            para.innerHTML = `Title: ${myBooks[red.id].title}<br>
                        Author: ${myBooks[red.id].author}<br>
                        Read: ${myBooks[red.id].read}`
    })

    bookShelf.appendChild(card)
    card.appendChild(para)
    card.appendChild(red)
    card.appendChild(del)
}