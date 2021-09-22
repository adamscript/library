//Initializing the objects so the app won't look empty like this feeling
let myLibrary = [{author: "J. M. Barlog",
                categories: "Fiction",
                cover: "https://i.weltbild.de/p/god-of-war-titan-books-274993668.jpg?v=1&wp=p5",
                description: "The novelization of the highly anticipated God of War game. His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse gods and monsters. It is in this harsh, unforgiving world that he must fight to survive... and teach his son to do the same. This startling reimagining of God of War deconstructs the core elements that defined the series--satisfying combat; breathtaking scale; and a powerful narrative--and fuses them anew.",
                id: "562e64a7-8a93-4270-8733-f765e4c14df8",
                isbn: "1789094917",
                language: "English",
                pages: "352",
                published: "2020-08-25",
                publisher: "Titan Books",
                read: true,
                title: "God of War - The Official Novelization"},

                {author: "J.R.R. Tolkien",
                categories: "Young Adult Fiction",
                cover: "https://images.foyles.co.uk/xlarge/books/img/0/2/6/9780261103344.jpg",
                description: "A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum. “A glori...",
                id: "f0573d66-b26c-4491-aa57-986e09867b7a",
                isbn: "9780547951973",
                language: "English",
                pages: "288",
                published: "2012-02-15",
                publisher: "Houghton Mifflin Harcourt",
                read: true,
                title: "The Hobbit"}, 

                {author: "Chris Allcock",
                categories: "Fiction",
                cover: "https://images-na.ssl-images-amazon.com/images/I/81H+RN7gRoL.jpg",
                description: "Dive into a world of pirates, plunder, and peril with this novel based on Rare’s thrilling adventure game, Sea of Thieves. Long ago, at the height of the Golden Age of Piracy, the infamous pirate Ramsey and his shipmates sacrificed everything to embark on an impossible journey into the Sea of Thieves. In the present day, Larinna, an ambitious stowaway determined to leave her mark on history, joins forces with a wild and adventurous captain seeking the greatest treasure ever buried. Separated by time but united by their drive to uncover the secrets of the Sea of Thieves, both crews will face tricks, traps, and malevolent horrors u...",
                id: "db1e32b0-c2be-4824-8650-3b407413a25d",
                isbn: "9781683834878",
                language: "English",
                pages: "264",
                published: "2018-10-23",
                publisher: "Insight Editions",
                read: false,
                title: "Sea of Thieves: Athena's Fortune"}, 

                {author: "Shad M. Brooks",
                categories: "Fiction",
                cover: "https://m.media-amazon.com/images/I/51GYWlG-FML.jpg",
                description: "Who better to fight back the darkness of the world than the one responsible for most of it? Daylen, once known as the Great Bastard, the Scourge of Nations, Dayless the Conqueror, has lived in hiding since his presumed death. Burdened by age and tremendous guilt, he thinks his life is coming to an end. Unbeknownst to him he's about to embark on a journey towards redemption where his ruthless abilities might save the world. Many battles await with friends to be made and a past filled with countless crimes to confront, all the while trying to keep his true identity a secret. Indeed, it might be too much if not for the fabled power ...",
                id: "1ccd961b-2f25-4b8d-aab8-8794bf3e13ed",
                isbn: "0648572927",
                language: "English",
                pages: "504",
                published: "2019-07",
                publisher: "Chronicles of Everfall",
                read: false,
                title: "Shadow of the Conqueror"}];

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
    document.getElementById('newBookWindow').hidden = true;
    setLibraryItem()
    updateBookList();
    clearForm();
}

function updateBookList(){
    while (document.querySelector('#bookList').firstChild){
        document.querySelector('#bookList').removeChild(document.querySelector('#bookList').firstChild)
    }

    //Draw book list
    for (let i = 0; i < myLibrary.length; i++){
        const bookCoverFrame = document.createElement("div");
        bookCoverFrame.className = "bookCoverFrame";
        bookCoverFrame.id = i + "bookCoverFrame"
        document.getElementById("bookList").appendChild(bookCoverFrame);
        
        const bookCover = document.createElement("img");
        bookCoverFrame.appendChild(bookCover);
        bookCover.src = myLibrary[i].cover;

        const bookCoverOverlay = document.createElement("div");
        bookCoverOverlay.className = "bookCoverOverlay";
        bookCoverFrame.appendChild(bookCoverOverlay);

        const bookCoverStatusFrame = document.createElement("div");
        bookCoverStatusFrame.className = "bookCoverStatusFrame";
        bookCoverStatusFrame.id = i + "bookStatus"
        bookCoverStatusFrame.hidden = false;
        bookCoverStatusFrame.innerHTML = "bookmark";
        bookCoverFrame.appendChild(bookCoverStatusFrame);

        const bookCoverButtonFrame = document.createElement("div");
        bookCoverButtonFrame.className = "bookCoverButtonFrame";
        bookCoverButtonFrame.hidden = true;
        bookCoverFrame.appendChild(bookCoverButtonFrame);

        const bookCoverButton = document.createElement("div");
        bookCoverButton.className = "bookCoverButton";
        bookCoverButtonFrame.appendChild(bookCoverButton);

        const bookDelete = document.createElement("button");
        bookDelete.className = "bookDelete";
        bookDelete.innerHTML = "delete";
        bookCoverButton.appendChild(bookDelete);
        bookDelete.addEventListener("click", () => {
            if(confirm('Are you sure you want to delete "' + myLibrary[i].title + '" from your library?')){
                myLibrary.splice(myLibrary.findIndex(x => x.id == myLibrary[i].id), 1);
                document.getElementById('bookListDetail').style.opacity = 0;
                document.getElementById("bookListDetail").style.zIndex = 0;
                setLibraryItem()
                updateBookList();
                updateBookListDetail();
            }
        })   

        const bookStatus = document.createElement("button");
        bookStatus.className = "bookStatus";
        bookCoverButton.appendChild(bookStatus);
        bookStatus.addEventListener('mousedown', () => {
            if(myLibrary[i].read){
                myLibrary[i].read = false;
                setLibraryItem();
                updateBookList();
                updateBookListDetail(i);
            }
            else{
                myLibrary[i].read = true;
                setLibraryItem()
                updateBookList();
                updateBookListDetail(i);
            }
        });

        //Read button icon functionality
        if(myLibrary[i].read){
            bookCoverStatusFrame.hidden = false;
            bookStatus.innerHTML = "bookmark";
        }
        else{
            bookCoverStatusFrame.hidden = true;
            bookStatus.innerHTML = "bookmark_border";
        }

        const bookCoverButtonBg = document.createElement("div");
        bookCoverButtonBg.className = "bookCoverButtonBg";
        bookCoverButtonFrame.appendChild(bookCoverButtonBg);

        bookCoverFrame.addEventListener("mouseover", () => {
            updateBookListDetail(i);
            document.getElementById("bookListDetail").style.opacity = 1;
            document.getElementById("bookListDetail").style.zIndex = 2;
            bookCoverButtonFrame.hidden = false;
        });

        bookCoverFrame.addEventListener("mouseout", () => {
            document.getElementById("bookListDetail").style.opacity = 0;
            document.getElementById("bookListDetail").style.zIndex = 0;
            bookCoverButtonFrame.hidden = true;
        });
    }   
}

function updateBookListDetail(selectedBook){
    getLibraryItem()

    //Clear book list DOM
    while (document.querySelector('#bookListDetail').firstChild){
        document.querySelector('#bookListDetail').removeChild(document.querySelector('#bookListDetail').firstChild)
    }

    //Draw book list
    const bookDiv = document.createElement("div");
    bookDiv.id = "bookDiv"
    document.getElementById("bookListDetail").appendChild(bookDiv);

    const bookStatusText = document.createElement("p");
    bookStatusText.className = "bookStatusText";
    bookDiv.appendChild(bookStatusText);
    bookStatusText.innerHTML = "This book has been read";

    //Read status detail functionality
    if(myLibrary[selectedBook].read){
        bookStatusText.hidden = false;
    }
    else{
        bookStatusText.hidden = true;
    }

    const bookTitle = document.createElement("p");
    bookTitle.className = "bookListDetailTitle";
    bookDiv.appendChild(bookTitle);
    bookTitle.innerHTML = myLibrary[selectedBook].title;

    const bookAuthor = document.createElement("p");
    bookAuthor.className = "bookListDetails";
    bookDiv.appendChild(bookAuthor);
    bookAuthor.innerHTML = "Author : " + myLibrary[selectedBook].author;

    const bookPublished = document.createElement("p");
    bookPublished.className = "bookListDetails";
    bookDiv.appendChild(bookPublished);
    bookPublished.innerHTML = "Published : " + myLibrary[selectedBook].published;

    const bookPublisher = document.createElement("p");
    bookPublisher.className = "bookListDetails";
    bookDiv.appendChild(bookPublisher);
    bookPublisher.innerHTML = "Publisher : " + myLibrary[selectedBook].publisher;

    const bookLanguage = document.createElement("p");
    bookLanguage.className = "bookListDetails";
    bookDiv.appendChild(bookLanguage);
    bookLanguage.innerHTML = "Language : " + myLibrary[selectedBook].language;

    const bookCategories = document.createElement("p");
    bookCategories.className = "bookListDetails";
    bookDiv.appendChild(bookCategories);
    bookCategories.innerHTML = "Categories : " + myLibrary[selectedBook].categories;

    const bookPages = document.createElement("p");
    bookPages.className = "bookListDetails";
    bookDiv.appendChild(bookPages);
    bookPages.innerHTML = "Page count : " + myLibrary[selectedBook].pages;

    const bookDescription = document.createElement("p");
    bookDescription.className = "bookListDetailDesc";
    bookDiv.appendChild(bookDescription);
    bookDescription.innerHTML = myLibrary[selectedBook].description;

    const bookISBN = document.createElement("p");
    bookISBN.className = "bookListDetails";
    bookDiv.appendChild(bookISBN);
    bookISBN.innerHTML = "ISBN : " + myLibrary[selectedBook].isbn;
    
    //Set book detail frame position
    const bookListDetail = document.getElementById("bookListDetail")
    
    bookListDetail.style.top = (document.getElementById(selectedBook + 'bookCoverFrame').getBoundingClientRect().top + window.scrollY) + "px";
    bookListDetail.style.left = document.getElementById(selectedBook + 'bookCoverFrame').getBoundingClientRect().right + 15 + "px";

    //Make sure book detail frame never go off screen
    if(bookListDetail.getBoundingClientRect().right > window.innerWidth){
        bookListDetail.style.left = document.getElementById(selectedBook + 'bookCoverFrame').getBoundingClientRect().left - bookListDetail.getBoundingClientRect().width - 15 + "px";
    }

    if(bookListDetail.getBoundingClientRect().bottom > window.innerHeight){
        bookListDetail.style.top = document.getElementById(selectedBook + 'bookCoverFrame').getBoundingClientRect().top - ((bookListDetail.getBoundingClientRect().bottom - window.innerHeight) + (window.innerHeight - document.getElementById(selectedBook + 'bookCoverFrame').getBoundingClientRect().bottom)) + window.scrollY + "px";
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

//Convert ISO 631-1 to proper english name
function isoToEnglish(code){
    return langCodes[langCodes.findIndex(x => x.alpha2 === code)].English;
}

//Trim string to specified length
function trimStr(string, length){
    let charCount = string.length;
    let trimmedString;

    if(charCount>length){
        trimmedString = string.substring(0, length - 3) + "..."
    }
    else{
        trimmedString = string.substring(0, length);
    }

    return trimmedString;
}

//Check if an object property's value is null or not
function checkNull(value){
    if(value == null || value == ''){
        return '';
    }
    else{
        return value;
    }
}

function searchBook(){
    //Show loading indicator
    hideSearchBook();
    document.getElementById('loadingFade').hidden = false;

    fetch("https://www.googleapis.com/books/v1/volumes?q={" + document.getElementById('ftitle').value + "}", {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        //Clear book list DOM
        while (document.querySelector('#bookSearchList').firstChild){
            document.querySelector('#bookSearchList').removeChild(document.querySelector('#bookSearchList').firstChild)
        }
        
        for(let i = 0; i < 10; i++){

            //Check if an object has properties for title, authors, isbn, and cover img
            if(!('title' in response.items[i].volumeInfo)||
            !('authors' in response.items[i].volumeInfo)||
            !('imageLinks' in response.items[i].volumeInfo)||
            !('industryIdentifiers' in response.items[i].volumeInfo)){
                return;
            }
            else{
                const bookSearchResult = document.createElement("div");
                bookSearchResult.className = "bookSearchResult";
                document.getElementById("bookSearchList").appendChild(bookSearchResult);
                
                //Added values from API to form
                bookSearchResult.addEventListener("mousedown", () => {
                    document.getElementById('ftitle').value = checkNull(response.items[i].volumeInfo.title);
                    document.getElementById('fauthor').value = checkNull(response.items[i].volumeInfo.authors);
                    document.getElementById('fpublished').value = checkNull(response.items[i].volumeInfo.publishedDate);
                    document.getElementById('fpublisher').value = checkNull(response.items[i].volumeInfo.publisher);
                    document.getElementById('flanguage').value = checkNull(isoToEnglish(response.items[i].volumeInfo.language));
                    document.getElementById('fcategories').value = checkNull(response.items[i].volumeInfo.categories);
                    document.getElementById('fpages').value = checkNull(response.items[i].volumeInfo.pageCount);
                    document.getElementById('fdescription').value = checkNull(trimStr(response.items[i].volumeInfo.description, 640));
                    document.getElementById('fisbn').value = checkNull(response.items[i].volumeInfo.industryIdentifiers[0].identifier);
                    document.getElementById('fcover').value = checkNull(response.items[i].volumeInfo.imageLinks.thumbnail);

                    updateCover();
                    hideSearchBook();
                })

                //Show lists of search results
                const bookSearchResultFrame = document.createElement("div");
                bookSearchResultFrame.className = "bookSearchResultFrame";
                bookSearchResult.appendChild(bookSearchResultFrame);

                const bookSearchResultText = document.createElement("div");
                bookSearchResultText.className = "bookSearchResultText";
                bookSearchResult.appendChild(bookSearchResultText);

                const bookSearchResultTitle = document.createElement("p");
                bookSearchResultTitle.className = "bookSearchResultTitle";
                bookSearchResultText.appendChild(bookSearchResultTitle);
                bookSearchResultTitle.innerHTML = checkNull(response.items[i].volumeInfo.title);

                const bookSearchResultAuthor = document.createElement("p");
                bookSearchResultAuthor.className = "bookSearchResultAuthor";
                bookSearchResultText.appendChild(bookSearchResultAuthor);
                bookSearchResultAuthor.innerHTML = checkNull(response.items[i].volumeInfo.authors);

                const bookSearchResultImage = document.createElement("img");
                bookSearchResultImage.className = "bookSearchResultImage";
                bookSearchResultFrame.appendChild(bookSearchResultImage);
                bookSearchResultImage.src = checkNull(response.items[i].volumeInfo.imageLinks.thumbnail);
                }

        document.getElementById('loadingFade').hidden = true;
        showSearchBook();

        }
    })
    .catch((error) => {
        document.getElementById("bookSearchList").innerHTML = "Failed to retrieve data from Google Books API. Try again later";
        document.getElementById('loadingFade').hidden = true;
        showSearchBook();
        console.error(error)
    });
}

function clearForm(){
    document.getElementById('ftitle').value = '';
    document.getElementById('fauthor').value = '';
    document.getElementById('fpublished').value = '';
    document.getElementById('fpublisher').value = '';
    document.getElementById('flanguage').value = '';
    document.getElementById('fcategories').value = '';
    document.getElementById('fpages').value = '';
    document.getElementById('fdescription').value = '';
    document.getElementById('fisbn').value = '';
    document.getElementById('fcover').value = 'src/coverphd.png';
    document.getElementById('coverimg').src = 'src/coverphd.png';
}

function pasteImageURL(){
    let imageURL = prompt("Paste book cover image URL here :")

    if(imageURL == null || imageURL == ""){
        if(document.getElementById('fcover').value == 'src/coverphd.png' || 
            document.getElementById('coverimg').src == 'src/coverphd.png'){
                return;
        }
        else{
            if(confirm('Do you want to remove current book cover?')){
                document.getElementById('fcover').value = 'src/coverphd.png';
                document.getElementById('coverimg').src = 'src/coverphd.png';
            }
            else{
                return;
            }
        }
        
    }
    else{
        document.getElementById('fcover').value = imageURL;
        document.getElementById('coverimg').src = imageURL;
    }
}

function showSearchBook(){
    document.getElementById("bookSearchList").hidden = false;
}

function hideSearchBook(){
    document.getElementById("bookSearchList").hidden = true;
    document.getElementById("loadingFade").hidden = true;
}

function updateCover(){
    document.getElementById('coverimg').src = document.getElementById('fcover').value;
}

function showNewBook(){
    document.getElementById('newBookWindow').hidden = false;
}

function hideNewBook(){
    document.getElementById('newBookWindow').hidden = true;
}

function closeNewBook(){
    if(document.getElementById('ftitle').value != '' ||
        document.getElementById('fauthor').value != ''||
        document.getElementById('fpublished').value != ''||
        document.getElementById('fpublisher').value != ''||
        document.getElementById('flanguage').value != ''||
        document.getElementById('fcategories').value != ''||
        document.getElementById('fpages').value != ''||
        document.getElementById('fdescription').value != ''||
        document.getElementById('fisbn').value != ''||
        document.getElementById('fcover').value !== 'src/coverphd.png'){
            if(confirm('Keep changes?')){
                hideNewBook();
            }
            else{
                clearForm();
                hideNewBook();
            }
    }
    else{
        hideNewBook();
    }
}

document.getElementById("ftitle").addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        searchBook();
    }
})

//Setup localStorage functionality to save books
function setLibraryItem(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getLibraryItem(){
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

if(!localStorage.getItem('myLibrary')){
    setLibraryItem();
}

getLibraryItem();
updateBookList();