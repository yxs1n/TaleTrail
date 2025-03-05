class BookLog {
    constructor(id, book, pagesRead = 0, totalPagesRead = 0, dateAdded = new Date(), completed = false) {
        this.id = id;
        this.book = book;
        this.pagesRead = pagesRead;
        this.totalPagesRead = totalPagesRead;
        this.dateAdded = dateAdded;
        this.completed = completed;
    }

    calculateTotalPagesRead() {
        this.totalPagesRead = this.totalPagesRead + this.pagesRead;
    }

    /*triggerInteraction()*/
    
}