import BookLog from "./BookLog.js";
class Child {
    constructor(name) {
        this.name = name;
        this.parents = [];  // List of Parent objects
        this.currentBooks = [];  // List of Book objects
        this.bookLogs = [];  // List of BookLog objects
        this.badgesEarned = [];  // List of Badge objects
    }

    // Add to current books
    addCurrentBook(book) {
        this.currentBooks.push(book);
    }

    // add a BookLog entry
    addBooklog(log) {
        if (log instanceof BookLog) {
            this.bookLogs.push(log);
            console.log(`Book log added for ${this.name}: ${log.book}`);
        } else {
            console.error("Invalid BookLog object.");
        }
    }

    // Remove BookLog
    removeBookLog(startIndex, quant) {
        const bookName = this.bookLogs[startIndex].book;
        this.bookLogs.splice(startIndex, quant);
        console.log(`Book log removed for ${this.name}: ${bookName}`);
    }

    // Function to display book logs dynamically
    displayBookLogs() {
        const historyContent = document.getElementById("history-content");
        historyContent.innerHTML = ""; // Clear existing logs
    
        this.bookLogs.forEach((log, index) => {
            console.log(log);
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
    
            // Add delete button with a bin icon
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = `🗑️`; // Bin icon
            logEntry.appendChild(deleteButton);
    
            // Add event listener to delete the specific log
            deleteButton.addEventListener("click", () => {
                this.removeBookLog(index, 1); // Remove the log from the array
                this.displayBookLogs(); // Re-render the logs
            });
    
            historyContent.appendChild(logEntry);
        });
    };

    // view reading pathway
    viewPathway() {
        return new Pathway(this.bookLogs);
    }

    // add a badge earned from a challenge
    addBadge(challenge) {
        if (challenge instanceof Challenge) {
            this.badgesEarned.push(new Badge(challenge.name, challenge.description));
            console.log(`Badge earned for ${this.name}: ${challenge.name}`);
        } else {
            console.error("Invalid Challenge object.");
        }
    }
}

export default Child;
