const child = new Child("Emma", 8);

function updateUI() {
    document.getElementById("progressText").innerText = `You have read ${child.booksRead.length} books.`;
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear list before reloading

    child.booksRead.forEach(book => {
        const li = document.createElement("li");
        li.innerText = book;
        bookList.appendChild(li);
    });
}

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("title").value;

    if (bookTitle.trim() !== "") {
        child.logBook(bookTitle);
        updateUI();
        document.getElementById("title").value = ""; // Clear input field
    }
});

updateUI();
