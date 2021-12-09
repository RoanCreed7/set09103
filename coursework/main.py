import bcrypt
import sys
import os.path
import sqlite3 as sql
from random import shuffle
import random
import json

from flask import Flask, url_for, redirect, render_template, request, session
from functools import wraps

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def renderGamePage():


    if request.method == 'POST':
        
        username = request.form['username'];
        score = request.form['score'];
        print("Username: "+username+ ", Score: "+score);
        
        try:
            BASE_DIR = os.path.dirname(os.path.abspath(__file__))
            db_path = os.path.join(BASE_DIR, "database.db")
            conn = sql.connect(db_path)

            cur = conn.cursor()
            print("Connected")
        
            cur.execute("INSERT INTO leaderboard (username, score) VALUES (?,?)",(username, score))

            conn.commit()
            print("Upload Successful")


        except:
            conn.rollback()
            print("Connection Failed")


        return render_template('gameTemplate.html')

    return render_template('gameTemplate.html')




@app.route('/leaderboard')
def showUserInfo():
    try:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
        db_path = os.path.join(BASE_DIR, "database.db")
        conn = sql.connect(db_path)
        conn.row_factory = sql.Row
        cur = conn.cursor()
        print("Connected")
        cur.execute("SELECT * FROM leaderboard ORDER BY score DESC")
        rows = cur.fetchall();

        conn.close
        print("Selection Complete")

        return render_template('leaderboardTemplate.html', rows = rows)

        conn.close
        print("Selection Complete")
        
    except:
        conn.rollback()
        print("Connection Failed: Could not retrieve database")

        return render_template('leaderboardTemplate.html')



@app.route('/instructions')
def showInstructions():

    return render_template('instructionTemplate.html')

@app.errorhandler(404)
def page_not_found(error):
        return "Bit broken still. Couldn't find the page you requested.", 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
