CREATE TABLE Children (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES Parents(id)
);
