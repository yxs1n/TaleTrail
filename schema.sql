CREATE TABLE IF NOT EXISTS Child (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT,
    author TEXT,
    pages INTEGER,
    genre TEXT,
    band TEXT
);

CREATE TABLE IF NOT EXISTS ChildBooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (child_id) REFERENCES Child (id),
    FOREIGN KEY (book_id) REFERENCES Books (id)
);

CREATE TABLE IF NOT EXISTS BookLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    pages_read INTEGER NOT NULL,
    time_spent REAL,
    date_added TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (book_id) REFERENCES Book (id),
    FOREIGN KEY (child_id) REFERENCES Child (id)
);


