let myLibrary = [];

function setLibraryItem(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getLibraryItem(){
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

function Book(id, title, author, published, publisher, language, categories, pages, description, isbn, cover, read){
    this.id = id;
    this.title = title;
    this.author = author;
    this.published = published;
    this.publisher = publisher;
    this.language = language;
    this.categories = categories;
    this.pages = pages;
    this.description = description;
    this.isbn = isbn;
    this.cover = cover;
    this.read = read;
}

function addBookToLibrary(){
    let bookID = uuid();
    let bookTitle = document.getElementById('ftitle').value;
    let bookAuthor = document.getElementById('fauthor').value;
    let bookPublished = document.getElementById('fpublished').value;
    let bookPublisher = document.getElementById('fpublisher').value;
    let bookLanguage = document.getElementById('flanguage').value;
    let bookCategories = document.getElementById('fcategories').value;
    let bookPages = document.getElementById('fpages').value;
    let bookDescription = document.getElementById('fdescription').value;
    let bookISBN = document.getElementById('fisbn').value;
    let bookCover = document.getElementById('fcover').value;
    let bookStatus = false;

    myLibrary.push(new Book(bookID, bookTitle, bookAuthor, bookPublished, bookPublisher, bookLanguage, bookCategories, bookPages, bookDescription, bookISBN, bookCover, bookStatus));
    setLibraryItem()
    updateBookList();
}

function updateBookList(){
    getLibraryItem()

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
        bookTitle.innerHTML = myLibrary[i].title;

        const bookAuthor = document.createElement("p");
        bookDiv.appendChild(bookAuthor);
        bookAuthor.innerHTML = "Author : " + myLibrary[i].author;

        const bookPublished = document.createElement("p");
        bookDiv.appendChild(bookPublished);
        bookPublished.innerHTML = "Published : " + myLibrary[i].published;

        const bookPublisher = document.createElement("p");
        bookDiv.appendChild(bookPublisher);
        bookPublisher.innerHTML = "Publisher : " + myLibrary[i].publisher;

        const bookLanguage = document.createElement("p");
        bookDiv.appendChild(bookLanguage);
        bookLanguage.innerHTML = "Language : " + myLibrary[i].language;

        const bookCategories = document.createElement("p");
        bookDiv.appendChild(bookCategories);
        bookCategories.innerHTML = "Categories : " + myLibrary[i].categories;

        const bookPages = document.createElement("p");
        bookDiv.appendChild(bookPages);
        bookPages.innerHTML = "Page count : " + myLibrary[i].pages;

        const bookDescription = document.createElement("p");
        bookDiv.appendChild(bookDescription);
        bookDescription.innerHTML = "Description : " + myLibrary[i].description;

        const bookISBN = document.createElement("p");
        bookDiv.appendChild(bookISBN);
        bookISBN.innerHTML = "ISBN : " + myLibrary[i].isbn;

        const bookCover = document.createElement("img");
        bookDiv.appendChild(bookCover);
        bookCover.src = myLibrary[i].cover;

        const bookStatusLabel = document.createElement("label");
        bookStatusLabel.setAttribute("for", "bookStatus");
        bookDiv.appendChild(bookStatusLabel);
        bookStatusLabel.innerHTML = "Read";

        const bookStatus = document.createElement("input");
        bookStatus.setAttribute("type", "checkbox");
        bookStatus.id = "bookStatus";
        bookStatus.checked = myLibrary[i].read;
        bookDiv.appendChild(bookStatus);
        bookStatus.addEventListener('change', () => {
            if(bookStatus.checked){
                myLibrary[i].read = true;
                setLibraryItem()
                updateBookList();
            }
            else{
                myLibrary[i].read = false;
                setLibraryItem()
                updateBookList();
            }
        });

        const bookDelete = document.createElement("button");
        bookDiv.appendChild(bookDelete);
        bookDelete.innerHTML = "Delete Book";
        bookDelete.addEventListener("click", () => {
            myLibrary.splice(myLibrary.findIndex(x => x.id == myLibrary[i].id), 1);
            setLibraryItem()
            updateBookList();
        })
    }    
}

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

function searchBook(){
    fetch("https://www.googleapis.com/books/v1/volumes?q={" + document.getElementById('ftitle').value, {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        //Clear book list DOM
        while (document.querySelector('#bookSearchList').firstChild){
            document.querySelector('#bookSearchList').removeChild(document.querySelector('#bookSearchList').firstChild)
        }
        
        for(let i = 0; i < 10; i++){
            const bookSearchResult = document.createElement("div");
            bookSearchResult.className = "bookSearchResult";
            document.getElementById("bookSearchList").appendChild(bookSearchResult);
            bookSearchResult.addEventListener("mousedown", () => {
                document.getElementById('ftitle').value = response.items[i].volumeInfo.title;
                document.getElementById('fauthor').value = response.items[i].volumeInfo.authors;
                document.getElementById('fpublished').value = response.items[i].volumeInfo.publishedDate;
                document.getElementById('fpublisher').value = response.items[i].volumeInfo.publisher;
                document.getElementById('flanguage').value = response.items[i].volumeInfo.language;
                document.getElementById('fcategories').value = response.items[i].volumeInfo.categories;
                document.getElementById('fpages').value = response.items[i].volumeInfo.pageCount;
                document.getElementById('fdescription').value = response.items[i].volumeInfo.description;
                document.getElementById('fisbn').value = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
                document.getElementById('fcover').value = response.items[i].volumeInfo.imageLinks.thumbnail
                updateCover();
                hideSearchBook();
            })

            const bookSearchResultFrame = document.createElement("div")
            bookSearchResultFrame.id = "bookSearchResultFrame"
            bookSearchResult.appendChild(bookSearchResultFrame);
            
            const bookSearchResultImage = document.createElement("img");
            bookSearchResultImage.id = "bookSearchResultImage"
            bookSearchResultFrame.appendChild(bookSearchResultImage);
            bookSearchResultImage.src = response.items[i].volumeInfo.imageLinks.thumbnail;

            const bookSearchResultText = document.createElement("div")
            bookSearchResultText.id = "bookSearchResultText"
            bookSearchResult.appendChild(bookSearchResultText);

            const bookSearchResultTitle = document.createElement("p");
            bookSearchResultTitle.id = "bookSearchResultTitle"
            bookSearchResultText.appendChild(bookSearchResultTitle);
            bookSearchResultTitle.innerHTML = response.items[i].volumeInfo.title;

            const bookSearchResultAuthor = document.createElement("p");
            bookSearchResultAuthor.id = "bookSearchResultAuthor"
            bookSearchResultText.appendChild(bookSearchResultAuthor);
            bookSearchResultAuthor.innerHTML = response.items[i].volumeInfo.authors;
        }
    });
}

function showSearchBook(){
    document.getElementById("bookSearchList").hidden = false;
}

function hideSearchBook(){
    document.getElementById("bookSearchList").hidden = true;
}

function updateCover(){
    document.getElementById('coverimg').src = document.getElementById('fcover').value;
    console.log("cover updated!");
}

getLibraryItem();
updateBookList();