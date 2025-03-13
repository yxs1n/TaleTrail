from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('data.db')
cursor = conn.cursor()

with open('schema.sql', 'r') as f:
    cursor.executescript(f.read())

conn.commit()
conn.close()

#Add parent to parent table
def add_parent(name, email):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    cursor.execute("INSERT INTO Parent (name, email) VALUES (?, ?)", (name, email))
    conn.commit()
    conn.close()

#Add child to child table including parent id
def add_child(name, parent_id):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    cursor.execute("INSERT INTO Child (name, parent_id) VALUES (?, ?)", (name, parent_id))
    conn.commit()
    conn.close()

#Add book to book table
def insert_book(title, author, pages, genre, band):
    book = (title, None, author, pages, genre, band)
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Books (title, image, author, pages, genre, band) VALUES (?, ?, ?, ?, ?, ?)", book)
    conn.commit()
    conn.close()

#Add book log to booklog table
def add_book_log(book_id, child_id, pages_read, time_spent, completed):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO BookLog (book_id, child_id, pages_read, time_spent, date_added, completed) VALUES (?, ?, ?, ?, datetime('now'), ?)",
        (book_id, child_id, pages_read, time_spent, completed)
    )
    conn.commit()
    conn.close()

#Search for book with title
def return_record(query):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Books WHERE lower(title) = lower(?)", (query,))
    results = cursor.fetchall()
    conn.close()
    return results

#Adds book data to book table from manual entry
@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.get_json()  # Use get_json() to parse JSON data
    print("Received data:", data)  # Log received data
    title = data.get('title')
    author = data.get('author')
    pages = data.get('pages')
    genre = data.get('genre')
    band = data.get('band')
    
    # Call the function to insert the record into the database
    insert_book(title, author, pages, genre, band)
    
    # Redirect to home page after adding the book
    return "Book added successfully"

#Sends book data to frontend
@app.route('/api/record', methods=['GET'])
def get_record():
    query = request.args.get('title')
    records = return_record(query)
    return jsonify(records)

if __name__ == '__main__':
    app.run(debug=True)

# def delete_record(title):
#     conn = sqlite3.connect('books.db')
#     cursor = conn.cursor()
    
#     # Execute the DELETE statement to remove the row with the specified title
#     cursor.execute("DELETE FROM bookInfo WHERE lower(title) = lower(?)", (title,))
    
#     conn.commit()

# # Print table content
# conn = sqlite3.connect('books.db')
# cursor = conn.cursor()
# cursor.execute("SELECT * FROM bookInfo")
# results = cursor.fetchall()
# conn.close()
# for result in results:
#     print(result) 

# Code used to table create and store entries in table
#Create a table
# cursor.execute("""CREATE TABLE IF NOT EXISTS bookInfo (
#                title text,
#                image blob,
#                author text,
#                pages integer,
#                genre text,
#                band integer
#                )""")

# records = [('Cat in the hat', '', 'Dr. Seuss', 61, 'Picture book', '1'),
#            ('The Gruffalo','', 'Julia Donaldson', 32, 'Picture book', '1'),
#            ('The Tiger who came to tea', '', 'Judith Kerr', 32, 'Picture book', '3'),
#            ('Funnybones', '', 'Janet & Allan Ahlberg', 32, 'Juvenile Fiction', '7'),
#            ('The Rainbow Fish', '', 'Marcus Pfister',32, 'Juvenile Fiction', '3')]
# for record in records:
#     insert_book(record[0], record[2], record[3], record[4], record[5])