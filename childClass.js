class Child {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.booksRead = JSON.parse(localStorage.getItem(`${this.name}_books`)) || [];
    }

    logBook(bookTitle) {
        this.booksRead.push(bookTitle);
        localStorage.setItem(`${this.name}_books`, JSON.stringify(this.booksRead));
        console.log(`${this.name} has logged a new book: ${bookTitle}`);
    }

    viewProgress() {
        console.log(`${this.name} has read ${this.booksRead.length} books.`);
        return this.booksRead;
    }

    clearProgress() {
        this.booksRead = [];
        localStorage.removeItem(`${this.name}_books`);
        console.log(`${this.name}'s reading progress has been reset.`);
    }
}

// Export for use in other files (if using modules)
if (typeof module !== "undefined") {
    module.exports = Child;
}
