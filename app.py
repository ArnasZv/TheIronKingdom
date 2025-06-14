from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

app = Flask(__name__)

app.secret_key = "290519" #Key

messages = []

USERS_FILE = 'users.json'

def load_users():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'w') as f:
            json.dump({}, f)
    with open(USERS_FILE, 'r') as f:
        return json.load(f)
    

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/aboutus')
def about_us():
    return render_template('aboutus.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        users = load_users()

        if email in users and check_password_hash(users[email]['password'], password):
            session['user'] = users[email]['firstname']
            flash("Welcome back, " + users[email]['firstname'] + "!")
            return redirect(url_for('home'))
        else:
            flash("Invalid email or password.")
            return redirect(url_for('login'))
        
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("You have been logged out.")
    return redirect(url_for('home'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        firstname = request.form['firstname']
        email = request.form['email']
        password = request.form['password']

        users = load_users()

        if email in users:
            flash("Email already exists. Please log in.")
            return redirect(url_for('login'))
        
        hashed_pw = generate_password_hash(password)
        users[email] = {'firstname': firstname, 'password': hashed_pw}
        save_users(users)

        flash("Account created successfully! Please log in.")
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/shop')
def shop():
    if 'user' not in session:
        flash("Please log in to access the shop.")
        return redirect(url_for('login'))
    return render_template('shop.html')

@app.route('/contact_us')
def contact_us():
    return render_template('contact_us.html')

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

    with open("messages.txt", "a") as f:
        f.write(f"{name} | {email} | {message}\n")

    flash('Thank you for contacting us!')
    flash('We will get back to you as soon as possible.')

    return redirect(url_for('contact_us'))

@app.context_processor
def inject_user():
    return dict(logged_in_user=session.get('user'))

if __name__ == '__main__':
    app.run(debug=True)






   
    