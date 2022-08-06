from flask import Flask, render_template, request, session, url_for, redirect
import pymysql.cursors
import time
import datetime
import json
from django.shortcuts import render

# Initialize the app from Flask
app = Flask(__name__)

# Configure MySQL
conn = pymysql.connect(host='localhost',
                       user='root',
                       password="",
                       db='power_outage',
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)

@app.route('/')
def hello():
    return render_template('state.html')

@app.route('/city', methods=['GET', 'POST'])
def city_outage():
    #state_fip = request.form['state']
    data1 = 'hi there'
    return render_template("city.html", data = data1)

if __name__ == '__main__':
    app.run(host='127.0.0.1',
            port=5000, 
            debug=True
            )