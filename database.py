from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def return_record(query):
    conn = sqlite3.connect('books.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookInfo WHERE lower(title) = lower(?)", (query,))
    results = cursor.fetchall()
    conn.close()
    return results

def set_record(title, author, pages, genre, band):
    record = (title, None, author, pages, genre, band)
    conn = sqlite3.connect('books.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO bookInfo (title, image, author, pages, genre, band) VALUES (?, ?, ?, ?, ?, ?)", record)
    conn.commit()
    conn.close()

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
    set_record(title, author, pages, genre, band)
    
    # Redirect to home page after adding the book
    return "Book added successfully"

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

# cursor.executemany("INSERT INTO bookInfo VALUES (?, ?, ?, ?, ?, ?)", records)