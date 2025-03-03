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

@app.route('/api/record', methods=['GET'])
def get_record():
    query = request.args.get('title')
    records = return_record(query)
    return jsonify(records)

if __name__ == '__main__':
    app.run(debug=True)


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