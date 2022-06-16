// Book Class : represents a book
class Book {
    constructor(id,title,author,isbn){
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : handle UI tasks
class UI {
    static displayBooks(){
        // const storedBooks = [
        //     {
        //         id : 1,
        //         title : "Book one",
        //         author : "jack",
        //         isbn : "123",
        //     },
        //     {
        //         id : 2,
        //         title : "Book two",
        //         author : "jane",
        //         isbn : "456",
        //     },
        // ];

        const books = Store.getAllBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const bookList = document.querySelector("#book-list");
        const row = document.createElement("tr");
        row.classList.add("bg-white");
        row.innerHTML = `
        <td class="px-6 py-4">${book.title}</td>
        <td class="px-6 py-4">${book.author}</td>
        <td class="px-6 py-4">${book.isbn}</td>
        <td class="px-6 py-4">
            <button><i class="delete cursor-pointer fa-solid fa-trash bg-red-500" data-id=${book.id}></i></button>
        </td>
        `;

        bookList.appendChild(row);
    }


    static deleteBook(el){
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.parentElement.remove();
        }
    }


    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#ISBNnumber").value = "";
    }
}

// Storage Class : get and save books
class Store {
    static getAllBooks(){
        const books = JSON.parse(localStorage.getItem("books")) || [];
        return books ;
    }

    static saveBook(book){
        const savedbooks = Store.getAllBooks();
        savedbooks.push(book);
        localStorage.setItem("books", JSON.stringify(savedbooks));
    }

    static removeBook(isbn){
        const savedBooks = Store.getAllBooks();
        savedBooks.forEach((book,index) => {
            if (book.isbn === isbn) {
                savedBooks.splice(index,1);
            }
        });
        localStorage.setItem("books",JSON.stringify(savedBooks));
    }
}

// Event : display books
document.addEventListener("DOMContentLoaded",UI.displayBooks);

// Event : add a book
const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //get form values
    const id = new Date().getTime();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#ISBNnumber").value;

    //validate fields
    if (title === "" || author === "" || isbn === ""){
        alert("Please fill all fields !");
    }
    else {
        
        const book = new Book(id,title,author,isbn);
        
        // add book to UI
        UI.addBookToList(book);

        // add book to storage
        Store.saveBook(book);

        UI.clearFields();
    }

});

// Event : remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
    // console.log(e.target);
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
});