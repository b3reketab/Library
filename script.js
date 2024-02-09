let Library = [];

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead === 'Not read' ? this.isRead = 'Read' : this.isRead = 'Not read';
}

function addBook() {
    const title = document.getElementById('add-title');
    const author = document.getElementById('add-author');
    const isRead = 'Not read';

    const book = new Book(title.value, author.value, isRead);

    Library.push(book);

    displayBook(Library);
    title.value = '';
    author.value = '';

    closeInput();
}

function deleteBook(id) {
    Library.splice(id, 1);
    displayBook(Library);
}

function displayEditForm(id) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-title').value = Library[id].title;
    document.getElementById('edit-author').value = Library[id].author;
    document.getElementById('editForm').style.display = 'block';
}

function displayAddForm () {
    document.getElementById('addForm').style.display = 'block';
}

function updateBook() {
    const itemId = document.getElementById('edit-id').value;
    Library[itemId].title = document.getElementById('edit-title').value;
    Library[itemId].author = document.getElementById('edit-author').value;

    displayBook(Library);

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'none';
}

function displayBook(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    data.forEach((item, index) => {
        let readBtn = document.createElement('button');
        readBtn.innerText = 'toggle read';
        readBtn.addEventListener('click', () => {
            item.toggleRead();
            displayBook(Library);
        });

        let editBtn = document.createElement('button');
        editBtn.innerText = 'edit';
        editBtn.addEventListener('click', () => { displayEditForm(index) });

        let delBtn = document.createElement('button');
        delBtn.innerText = 'delete';
        delBtn.addEventListener('click', () => { deleteBook(index) });

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let titleTxt = document.createTextNode(item.title);
        td1.appendChild(titleTxt);

        let td2 = tr.insertCell(1);
        let authorTxt = document.createTextNode(item.author);
        td2.appendChild(authorTxt);

        let td3 = tr.insertCell(2);
        let readTxt = document.createTextNode(item.isRead);
        td3.appendChild(readTxt);

        let td4 = tr.insertCell(3);
        td4.appendChild(readBtn);

        let td5 = tr.insertCell(4);
        td5.appendChild(editBtn);

        let td6 = tr.insertCell(5);
        td6.appendChild(delBtn);
    });

    Library = data;
}
displayBook(Library);