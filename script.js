import Child from "./Child.js";
import Book from "./Book.js";
import BookLog from "./BookLog.js";
import Pathway from "./pathway.js";
// Temporary child
const Tim = new Child("Tim");

// Function to open popup
function openPopup(id) {
    document.getElementById(id).style.display = "block";
}

// Function to close popup
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

/* Log Popup */

//Using window to ensure that the function is accessible in the global scope
window.openAddLog = function() {
    openPopup("myPopup");
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
    openPopup('manual-entry-popup');
}

window.closeManualEntryPopup = function() {
    closePopup('manual-entry-popup');
}

/* Roadmap Popup */

window.openRoadmap = function(){
    openPopup("roadmap-popup");
    const pathway = new Pathway(Tim.bookLogs);
    pathway.renderCharts();
}

window.closeRoadmap = function(){
    closePopup("roadmap-popup");
}

/* Badge Popup */

window.openBadgePopup = function () {
    document.getElementById("badge-popup").style.display = "flex";
    renderBadges(earnedBadges, "badge-container");
};

window.closeBadgePopup = function () {
    document.getElementById("badge-popup").style.display = "none";
};

// Function to display book logs dynamically
window.displayBookLogs = function(bookLogs) {
    const historyContent = document.getElementById("history-content");
    historyContent.innerHTML = ""; // Clear existing logs

    bookLogs.forEach(log => {
        const logEntry = document.createElement("div");
        logEntry.classList.add("log-entry");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = `Book: ${log.book}`;
        logEntry.appendChild(bookTitle);

        const pagesRead = document.createElement("p");
        pagesRead.textContent = `Pages Read: ${log.pagesRead}`;
        logEntry.appendChild(pagesRead);

        const timeSpent = document.createElement("p");
        timeSpent.textContent = `Time Spent: ${log.timeSpent} minutes`;
        logEntry.appendChild(timeSpent);

        const dateAdded = document.createElement("p");
        dateAdded.textContent = `Date Added: ${log.dateAdded.toISOString().split('T')[0]}`;
        logEntry.appendChild(dateAdded);

        historyContent.appendChild(logEntry);
    });
};

// Modify the openLogHistory function to use the Child instance's book logs
window.openLogHistory = function() {
    displayBookLogs(Tim.bookLogs);
    openPopup("historyPopup");
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
                        window.openDetailsPopup(title, {author, pages, genre, band});
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
        openPopup('detailsPopup');
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

        closeDetailsPopup();
        closeAddLog();
    }
});

    /* Function to Display Earned Badges */
    function renderBadges(badges, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        badges.forEach(badge => {
            const badgeElement = document.createElement("div");
            badgeElement.classList.add("badge");
            badgeElement.innerHTML = `
                <img src="${badge.imageUrl}" alt="${badge.name} Badge">
                <p>${badge.name}</p>
            `;
            container.appendChild(badgeElement);
        });
    }

   /* Mock Data: Replace with backend data */
    const earnedBadges = [
        { name: "Beginner Reader", imageUrl: "images/beginner-badge.png" },
        { name: "Advanced Reader", imageUrl: "images/advanced-badge.png" },
        { name: "Expert Reader", imageUrl: "images/expert-badge.png" },
    ];

    document.addEventListener('DOMContentLoaded', () => {
        
         const welcomeMessage = document.getElementById("welcome__msg");
        if (welcomeMessage) {
            welcomeMessage.addEventListener("click", openBadgePopup);
        }
    });
