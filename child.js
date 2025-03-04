let child = JSON.parse(localStorage.getItem("child")) || new Child(1, "Emma");

Object.setPrototypeOf(child, Child.prototype);
child.bookLogs.forEach(log => Object.setPrototypeOf(log, BookLog.prototype));
child.badgesEarned.forEach(badge => Object.setPrototypeOf(badge, Badge.prototype));

function updateUI() {
    document.getElementById("progressText").innerText = `You have read ${child.viewPathway().totalPagesRead()} pages.`;

    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    child.bookLogs.forEach(log => {
        const li = document.createElement("li");
        li.innerText = `${log.bookTitle} - ${log.pagesRead} pages`;
        bookList.appendChild(li);
    });

    const badgeList = document.getElementById("badgeList");
    badgeList.innerHTML = "";
    child.badgesEarned.forEach(badge => {
        const li = document.createElement("li");
        li.innerText = `${badge.name}: ${badge.description}`;
        badgeList.appendChild(li);
    });

    localStorage.setItem("child", JSON.stringify(child)); // Save child data
}

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("title").value;
    const pagesRead = parseInt(document.getElementById("pages").value);

    if (bookTitle.trim() !== "" && pagesRead > 0) {
        child.addBooklog(new BookLog(bookTitle, pagesRead, Math.floor(Math.random() * 60) + 10));
        updateUI();
        document.getElementById("title").value = "";
        document.getElementById("pages").value = "";
    }
});

document.getElementById("earnBadge").addEventListener("click", function() {
    const challenge = new Challenge("Read 100 Pages", "Earn this badge by reading 100 pages.");
    child.addBadge(challenge);
    updateUI();
});

updateUI();
