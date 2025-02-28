import sqlite3

conn = sqlite3.connect('books.db')

cursor = conn.cursor()

#Create a table
cursor.execute("""CREATE TABLE bookInfo (
               id integer,
               name text,
               pages integer,
               band text
               )""")

# Commit command
conn.commit()

# Close connection
conn.close()