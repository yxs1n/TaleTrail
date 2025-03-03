import sqlite3

conn = sqlite3.connect('books.db')

cursor = conn.cursor()

#Create a table
cursor.execute("""CREATE TABLE bookInfo (
               id integer,
               title text,
               image blob,
               author text,
               pages integer,
               genre integer,
               band text
               )""")

# Commit command
conn.commit()

# Close connection
conn.close()