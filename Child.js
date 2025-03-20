import BookLog from "./BookLog.js";
class Child {
    constructor(name) {
        this.id;
        this.name = name;
        this.currentBooks = [];  // List of Book objects
        this.bookLogs = [];  // List of BookLog objects
        this.totalPagesRead = 0;
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
        const book = this.bookLogs[startIndex];
        this.bookLogs.splice(startIndex, quant);
        console.log(`Book log removed for ${this.name}: ${book.book}`);
    }

    getTotalPagesRead() {
        this.totalPagesRead = 0;
        for(var i = 0; i < this.bookLogs; i++) {
            this.totalPagesRead += this.bookLogs[i].pagesRead;
        }
        return this.totalPagesRead;
    }

    // Stores child to SQL table
    saveChild() {
        fetch('http://127.0.0.1:5000/add_child', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Child already exists!") {
                console.log(`Child already exists with ID: ${data.child_id}`);
            } else {
                console.log(`Child added successfully with ID: ${data.child_id}`);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Stores current book to SQL table
    saveBook(childId, bookId) {
        fetch('http://127.0.0.1:5000/add_child_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ child_id: childId, book_id: bookId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Book already added to child's current books!") {
                console.log("This book is already associated with the child.");
            } else {
                console.log("Book added to the child's current books successfully!");
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Stores book log in SQL table
    saveBookLog(bookId, childId, pagesRead, timeSpent, dateAdded, completed) {
        fetch('http://127.0.0.1:5000/add_book_log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                book_id: bookId,
                child_id: childId,
                pages_read: pagesRead,
                time_spent: timeSpent,
                date_added: dateAdded,
                completed: completed,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Book Log Added:', data);
        })
        .catch(error => console.error('Error:', error));
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
}

export default Child;
