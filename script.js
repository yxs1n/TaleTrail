import Child from "./Child.js";
import Book from "./Book.js";
import BookLog from "./BookLog.js";
// Temporary child
const Tim = new Child("Tim");

/* Log Popup */

//Using window to ensure that the function is accessible in the global scope
window.openAddLog = function() {
    document.getElementById("myPopup").style.display = "block";
}

window.closeAddLog = function(){
    document.getElementById("myPopup").style.display = "none";
}

window.closeAddLog = closeAddLog;

/* Roadmap Popup */

window.openRoadmap = function(){
    document.getElementById("roadmap-popup").style.display = "block";
}

window.closeRoadmap = function(){
    document.getElementById("roadmap-popup").style.display = "none";
}

/* Search functionality */
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    const popupForm = document.getElementById('popup-form');
    const detailsPopup = document.getElementById('detailsPopup');
    const selectedBookTitle = document.getElementById('selected-book-title');
    let selectedBookData = {};
    
    window.searchBooks = async () => {
        const query = searchBox.value.trim();
        // Construct the API URL with the encoded search query parameter to avoid special character issues
        const apiUrl = `http://127.0.0.1:5000/api/record?title=${encodeURIComponent(query)}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            resultsDiv.innerHTML = '';

            // Displays results beneath search bar
            if(data.length > 0) {
                data.forEach(record => {
                    const [title, image, author, pages, genre, band] = record;
                    const recordElement = document.createElement('div');
                    recordElement.className = 'search-result';
                    recordElement.innerHTML = `
                    <h3>${title}</h3>
                    <p>Author: ${author}</p>
                    <p>Pages: ${pages}</p>
                    <p>Genre: ${genre}</p>
                    <p>Band: ${band}</p>`;
                    recordElement.addEventListener('click', () => {
                        openDetailsPopup(title, {author, pages, genre, band});
                    });
                    resultsDiv.appendChild(recordElement);
                });
            } else {
                resultsDiv.textContent = 'No results found';
            }
        } catch (error) {
            resultsDiv.textContent = 'Error fetching data.';
            console.error('Error fetching data:', error);
        }
    };

    // Function to open the book details popup
    window.openDetailsPopup = function(bookTitle, bookData) {
        selectedBookTitle.textContent = bookTitle;
        selectedBookData = bookData;
        detailsPopup.style.display = 'flex';
    }

    // Function to close the book details popup 
    window.closeDetailsPopup = function() {
        detailsPopup.style.display = 'none';
    }

    // Function to save book log details
    window.saveLog = function() {
        const pagesRead = document.getElementById('pages-read').value;
        const timeSpent = document.getElementById('time-spent').value;
        const bookTitle = selectedBookTitle.textContent;
        const {author, pages, genre, band} = selectedBookData;

        const book = new Book(bookTitle, null, author, pages, genre, band);
        const bookLog = new BookLog(book, pagesRead, timeSpent);
        Tim.currentBooks.push(book);
        Tim.bookLogs.push(bookLog);

        console.log(Tim.bookLogs.length);
        console.log("Current books: " + Tim.currentBooks[0].title +
            "\nBooklog:\nBook: " +  Tim.bookLogs[0].book +
            ", Pages Read: " + Tim.bookLogs[0].pagesRead +
            ", Time Spent: " + Tim.bookLogs[0].timeSpent + 
            ", Date Added: " + Tim.bookLogs[0].dateAdded);

        closeDetailsPopup();
        closeAddLog();
    }
});