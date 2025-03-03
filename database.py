import sqlite3

conn = sqlite3.connect('books.db')

cursor = conn.cursor()

#Create a table
cursor.execute("""CREATE TABLE IF NOT EXISTS bookInfo (
               title text,
               image blob,
               author text,
               pages integer,
               genre integer,
               band text
               )""")

# Add single record
cursor.execute("INSERT INTO bookInfo VALUES ('The Rainbow Fish', '', 'Marcus Pfister', 32, 'Juvenile Fiction', 3)")

# Commit command
conn.commit()

# Close connection
conn.close()