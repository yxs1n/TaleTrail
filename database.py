import sqlite3

conn = sqlite3.connect('books.db')

cursor = conn.cursor()

#Create a table
cursor.execute("""CREATE TABLE IF NOT EXISTS bookInfo (
               title text,
               image blob,
               author text,
               pages integer,
               genre text,
               band integer
               )""")

# records = [('Cat in the hat', '', 'Dr. Seuss', 61, 'Picture book', '1'),
#            ('The Gruffalo','', 'Julia Donaldson', 32, 'Picture book', '1'),
#            ('The Tiger who came to tea', '', 'Judith Kerr', 32, 'Picture book', '3'),
#            ('Funnybones', '', 'Janet & Allan Ahlberg', 32, 'Juvenile Fiction', '7'),
#            ('The Rainbow Fish', '', 'Marcus Pfister',32, 'Juvenile Fiction', '3')]

# cursor.executemany("INSERT INTO bookInfo VALUES (?, ?, ?, ?, ?, ?)", records)

def return_record(query):
    cursor.execute("SELECT * FROM bookInfo WHERE lower(title) = lower(?)", (query,))
    results = cursor.fetchall()
    for row in results:
        print(row)

return_record("the gruffalo")

# Commit command
conn.commit()

# Close connection
conn.close()