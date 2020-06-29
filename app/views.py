from app import app
from flask import render_template, url_for

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/store")
def store():
    return render_template("store.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/game")
def game():
    return render_template("game.html")