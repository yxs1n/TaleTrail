import BookLog from "./BookLog.js";
class Child {
    constructor(name) {
        this.name = name;
        this.parents = [];  // List of Parent objects
        this.currentBooks = [];  // List of Book objects
        this.bookLogs = [];  // List of BookLog objects
        this.badgesEarned = [];  // List of Badge objects
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
