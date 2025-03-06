class BookLog {
    constructor(book, pagesRead, timeSpent, dateAdded = new Date(), completed = false) {
        this.book = book.title;
        this.pagesRead = pagesRead;
        this.timeSpent = timeSpent;
        this.dateAdded = dateAdded;
        this.completed = completed;
    }

    /*triggerInteraction()*/
    
}

export default BookLog;