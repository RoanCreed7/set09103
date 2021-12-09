import sqlite3

conn = sqlite3.connect('database.db')
print ("Opened database successfully");

conn.execute('DROP TABlE leaderboard')
print("deleted")
conn.execute('CREATE TABLE leaderboard (username TEXT, score INT)')

print ("Table created successfully");
conn.close()
