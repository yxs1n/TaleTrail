import Child from "./Child.js";
import Book from "./Book.js";
import BookLog from "./BookLog.js";
import Pathway from "./Pathway.js";
import Badges from "./Badges.js";
// Temporary child
const Tim = new Child("Tim");
Tim.saveChild();
const badges = new Badges();

// Function to open popup
function openPopup(id, type) {
    document.getElementById(id).style.display = type;
}

// Function to close popup
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

/* Log Popup */

//Using window to ensure that the function is accessible in the global scope
window.openAddLog = function() {
    openPopup("myPopup", "block");
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
}

window.closeAddLog = function(){
    closePopup("myPopup");
}

// Function to close the book details popup 
window.closeDetailsPopup = function() {
    closePopup('detailsPopup');
}

/* Manual Entry Popup */
window.enterManually = function() {
    openPopup('manual-entry-popup', 'block');
}

window.closeManualEntryPopup = function() {
    closePopup('manual-entry-popup');
}

/* Challenge Popup */
window.openChallenges = function() {
    openPopup("challenge-popup", 'block');
}
    
window.closeChallenges = function() {
    closePopup("challenge-popup");
}
        
/* Roadmap Popup */
window.openRoadmap = function(){
    openPopup("roadmap-popup", "block");
    const pathway = new Pathway(Tim.bookLogs);
    pathway.renderCharts();
}

window.closeRoadmap = function(){
    closePopup("roadmap-popup");
}

/* Badge Popup */

window.openBadgePopup = function () {
    openPopup("badge-popup", "flex");
    let totalPagesRead = 0; // Change this value for testing
    badges.renderBadges(Tim.getTotalPagesRead()); 
};


window.closeBadgePopup = function () {
    closePopup("badge-popup");
};

// Open log history
window.openLogHistory = function() {
    Tim.displayBookLogs();
    openPopup("historyPopup", "block");
};

// Function to close the history popup
window.closeHistoryPopup = function() {
    closePopup("historyPopup");
}

/* Add log functionality */
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    const selectedBookTitle = document.getElementById('selected-book-title');
    const pagesRead = document.getElementById('pages-read').value;
    const timeSpent = document.getElementById('time-spent').value;
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
                    const [id, title, image, author, pages, genre, band] = record;
                    const recordElement = document.createElement('div');
                    recordElement.className = 'search-result';
                    recordElement.innerHTML = `
                    <h3>${title}</h3>
                    <p>Author: ${author}</p>
                    <p>Pages: ${pages}</p>
                    <p>Genre: ${genre}</p>
                    <p>Band: ${band}</p>`;
                    resultsDiv.appendChild(recordElement);
                    recordElement.addEventListener('click', () => {
                        window.openDetailsPopup(title, {id, author, pages, genre, band});
                    });
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
        //Clear prior entries
        document.getElementById('pages-read').value = "";
        document.getElementById('time-spent').value = "";
        openPopup('detailsPopup', 'block');
    }

    // Function to save book log details
    window.saveLog = function() {
        const pagesRead = document.getElementById('pages-read').value;
        const timeSpent = document.getElementById('time-spent').value;
        const bookTitle = selectedBookTitle.textContent;
        const {id, author, pages, genre, band} = selectedBookData;

        const book = new Book(id, bookTitle, null, author, pages, genre, band);
        const bookLog = new BookLog(book, pagesRead, timeSpent);
        Tim.addCurrentBook(book);
        Tim.addBooklog(bookLog);
        Tim.saveBook(1, book.id)
        Tim.saveBookLog(book.id, 1, bookLog.pagesRead, bookLog.timeSpent, bookLog.dateAdded, bookLog.completed)

        closeDetailsPopup();
        closeAddLog();
    }
});

// Add event listener to each book element in bookshelf 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".book").forEach((book) => {
        book.addEventListener("click", function () {
            alert("Opening book details: " + this.textContent);
        });
    });
});
