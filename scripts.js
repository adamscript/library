let myLibrary = [
    {
        id: 176432837,
        title: 'The Hobbit'
    },
    {
        id: 329874329,
        title: 'Lord of the Rings'
    }
];

function Book(id, title){
    this.id = id;
    this.title = title;
}

function addBookToLibrary(){
    let bookID = uuid();
    let bookTitle = document.getElementById('ftitle').value;

    myLibrary.push(new Book(bookID, bookTitle));
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

        const bookDelete = document.createElement("button");
        bookDiv.appendChild(bookDelete);
        bookDelete.innerHTML = "Delete Book"
        bookDelete.addEventListener("click", () => {
            myLibrary.splice(myLibrary.findIndex(x => x.id == myLibrary[i].id), 1);
            updateBookList();
        })
    }    
}

updateBookList();

//Generate UUID for book identification
function uuid() {    
    var uuid = "", i, random;    

    for (i = 0; i < 32; i++) {      
        random = Math.random() * 16 | 0;        

        if (i == 8 || i == 12 || i == 16 || i == 20) {        
            uuid += "-";      
        }

        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);    
     }   

     return uuid;  
}