function Book(title){
    this.title = title;
}

function addBookToLibrary(title){
    const newBookDiv = document.createElement("p");
    document.getElementById("bookList").appendChild(newBookDiv);

    newBookDiv.innerHTML = title;
}

const theHobbit = new Book('The Hobbit');
const LotR = new Book('LotR');

let myLibrary = [theHobbit, LotR];

console.log(theHobbit.title)
for (let i = 0; i < myLibrary.length; i++){
    addBookToLibrary(myLibrary[i].title);
}

