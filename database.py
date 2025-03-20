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

#Add child to child table
def insert_child(name):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    try:
        # Check if the child already exists
        cursor.execute("SELECT id FROM Child WHERE name = ?", (name,))
        existing_child = cursor.fetchone()

        if existing_child:
            return jsonify({"message": "Child already exists!", "child_id": existing_child[0]})

        # Add the new child
        cursor.execute("INSERT INTO Child (name) VALUES (?)", (name,))
        conn.commit()
        return jsonify({"message": "Child added successfully!", "child_id": cursor.lastrowid})
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
    finally:
        conn.close()

#Add book read by child to ChildBooks table
def insert_child_book(child_id, book_id):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    try:
        # Check if the book is already associated with the child
        cursor.execute("SELECT id FROM ChildBooks WHERE child_id = ? AND book_id = ?", (child_id, book_id))
        existing_entry = cursor.fetchone()

        if existing_entry:
            return jsonify({"message": "Book already added to child's current books!"})
        
        # Add the book for the child
        cursor.execute("INSERT INTO ChildBooks (child_id, book_id) VALUES (?, ?)", (child_id, book_id))
        conn.commit()
        return jsonify({"message": "Book added to child's current books successfully!"})
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
    finally:
        conn.close()


#Add book log to booklog table
def insert_book_log(book_id, child_id, pages_read, time_spent, date_added, completed):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()

    try:
        # Add the new book log
        cursor.execute("""
            INSERT INTO BookLog (book_id, child_id, pages_read, time_spent, date_added, completed)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (book_id, child_id, pages_read, time_spent, date_added, completed))
        conn.commit()
        return jsonify({"message": "Book log added successfully!"})
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
    finally:
        conn.close()

#Add book to book table
def insert_book(title, author, pages, genre, band):
    book = (title, None, author, pages, genre, band)
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Books (title, image, author, pages, genre, band) VALUES (?, ?, ?, ?, ?, ?)", book)
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

# Route for adding child
@app.route('/add_child', methods=['POST'])
def add_child():
    data = request.get_json()
    name = data['name']
    return insert_child(name)  

#Route for adding book to child's current books table
@app.route('/add_child_book', methods=['POST'])
def add_child_book():
    data = request.get_json()  # Receive JSON data
    child_id = data['child_id']
    book_id = data['book_id']
    response = insert_child_book(child_id, book_id)  # Call database function
    return response  # Return the response as JSON

#Route for adding book log
@app.route('/add_book_log', methods=['POST'])
def add_book_log_route():
    data = request.get_json()  # Receive JSON data
    book_id = data['book_id']
    child_id = data['child_id']
    pages_read = data['pages_read']
    time_spent = data['time_spent']
    date_added = data['date_added']
    completed = data['completed']
    response = insert_book_log(book_id, child_id, pages_read, time_spent, date_added, completed)
    return response  # Return the response as JSON

# Route to return child info to frontend
@app.route('/get_child/<int:child_id>', methods=['GET'])
def get_child(child_id):
    # Query the database to get the child
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Child WHERE id = ?", (child_id,))
    child = cursor.fetchone()
    conn.close()

    if child:
        return jsonify({"id": child[0], "name": child[1]})
    return jsonify({"error": "Child not found"}), 404

# Route to get child current books
@app.route('/get_child_books/<int:child_id>', methods=['GET'])
def get_child_books(child_id):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("""
        SELECT Books.* FROM Books
        JOIN ChildBooks ON Books.id = ChildBooks.book_id
        WHERE ChildBooks.child_id = ?
    """, (child_id,))
    books = cursor.fetchall()
    conn.close()

    return jsonify([
        {"id": book[0], "title": book[1], "image": book[2], "author": book[3], "pages": book[4], "genre": book[5], "band": book[6]}
        for book in books
    ])

# Route to get book logs
@app.route('/get_book_logs/<int:child_id>', methods=['GET'])
def get_book_logs(child_id):
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute("""
        SELECT BookLog.*, Books.title, Books.image, Books.author, Books.pages, Books.genre, Books.band
        FROM BookLog
        JOIN Books ON BookLog.book_id = Books.id
        WHERE BookLog.child_id = ?
    """, (child_id,))
    logs = cursor.fetchall()
    conn.close()

    return jsonify([
        {"log_id": log[0], "book_id": log[1], "child_id": log[2], "pages_read": log[3],
         "time_spent": log[4], "date_added": log[5], "completed": log[6],
         "title": log[7], "image": log[8], "author": log[9], "pages": log[10], "genre": log[11], "band": log[12]}
        for log in logs
    ])

if __name__ == '__main__':
    app.run(debug=True)

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