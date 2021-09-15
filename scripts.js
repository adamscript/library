let myLibrary = [
    {
        title: 'The Hobbit'
    },
    {
        title: 'Lord of the Rings'
    }
];

function Book(title){
    this.title = title;
}

function addBookToLibrary(){
    myLibrary.push(new Book(document.getElementById('ftitle').value))
    updateBookList();
}

function updateBookList(){
    //Clear book list DOM
    while (document.querySelector('#bookList').firstChild){
        document.querySelector('#bookList').removeChild(document.querySelector('#bookList').firstChild)
    }

    //Draw book list
    for (let i = 0; i < myLibrary.length; i++){
        const bookDiv = document.createElement("div");
        bookDiv.className = "bookDiv"
        document.getElementById("bookList").appendChild(bookDiv);

        const bookTitle = document.createElement("p");
        bookDiv.appendChild(bookTitle);
        bookTitle.innerHTML = "Title : " + myLibrary[i].title;
    }    
}

updateBookList();