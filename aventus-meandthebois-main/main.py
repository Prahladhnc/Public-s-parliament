import sqlite3
import os
from flask import Flask
from flask import render_template, url_for, redirect
from flask import request
from jinja2 import Template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, bindparam, text, select
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
import matplotlib.pyplot as plt

current_dir=os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

engine = create_engine('sqlite:///aventusdb.sqlite3')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+ os.path.join(current_dir, "aventusdb.sqlite3")
db = SQLAlchemy()
db.init_app(app)
app.app_context().push()



class Users(db.Model):
    __tablename__='users'
    Aanum = db.Column(db.Integer, primary_key=True)
    mobnum=db.Column(db.Integer, unique=True, nullable=False)
    password=db.Column(db.String, nullable=False)
    name=db.Column(db.String)
    state=db.Column(db.String)
    religion=db.Column(db.String)
    profession=db.Column(db.String)
    Age=db.Column(db.Integer)
    
class Bills(db.Model):
    __tablename__='bills'
    BID=db.Column(db.Integer, primary_key=True)
    BName=db.Column(db.String)
    Ministry=db.Column(db.String)
    status=db.Column(db.String)
    Description=db.Column(db.String)
    year=db.Column(db.Integer)
    



    
class Opinions(db.Model):
    __tablename__='opinions'
    resnum=db.Column(db.Integer, primary_key=True, autoincrement=True)
    Aanum=db.Column(db.Integer, db.ForeignKey("users.Aanum"), nullable=False)
    BID=db.Column(db.Integer, db.ForeignKey("bills.BID"), nullable=False)
    rating=db.Column(db.Integer)
    comments=db.Column(db.String)



@app.route("/", methods=["GET", "POST"])
def main():
    if request.method=="GET":
        return render_template("main.html")
    if request.method=="POST":
        engine=create_engine('sqlite:///aventusdb.sqlite3', echo=True)
        Session = sessionmaker(bind=engine)
        session = Session()
        metadata = MetaData()
        users= Table('users', metadata,
                Column('Aanum', Integer, primary_key=True),
                Column('mobnum',Integer),
                Column('password',String),
                Column('name',String),
                Column('state', String),
                Column('religion', String),
                Column('profession', String),
                Column('Age', Integer),
            )
        Aanum=request.form["Aanum"]     
        password=request.form["password"]
        user=Users.query.filter_by(Aanum=Aanum).first()
        bills=Bills.query.all()
        if not user:
            return render_template("wrong.html")
        
        else:
            pwd=user.password
            if pwd!=password:
                return render_template("wrpw.html")
            else:
                return render_template("bills.html", Aanum=Aanum, bills=bills)
        
    
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method=="GET":
        return render_template("signup.html")
    elif request.method=="POST":
        engine=create_engine('sqlite:///aventusdb.sqlite3', echo=True)
        Session = sessionmaker(bind=engine)
        session = Session()
        metadata = MetaData()
        users= Table('users', metadata,
            Column('Aanum', Integer, primary_key=True),
            Column('mobnum',Integer),
            Column('password',String),
            Column('name',String),
            Column('state', String),
            Column('religion', String),
            Column('profession', String),
            Column('Age', Integer)
        )
        Aanum=request.form["Aanum"],
        mobnum=request.form["mobnum"],
        password=request.form["password"],
        name=request.form["name"],
        state=request.form["state"],
        religion=request.form["religion"],
        profession=request.form["profession"],
        age=request.form["age"]
        new_user=users.insert().values(
            Aanum=Aanum[0],
            mobnum=mobnum[0],
            password=password[0],
            name=name[0],
            state=state[0],
            religion=religion[0],
            profession=profession[0],
            Age=age,
        )
        session.execute(new_user)
        session.commit()
        Aanum=Aanum[0]
        x="/bills/"+str(Aanum)
        return redirect(x)
    
@app.route("/bills/<int:Aanum>", methods=["GET", "POST"])
def bills(Aanum):
    if request.method=="GET":
        bills=Bills.query.all()
        return render_template("bills.html" , bills=bills, Aanum=Aanum)

@app.route("/more/<int:BID>/<int:Aanum>", methods=["GET","POST"])
def moreinfo(BID,Aanum):
    if request.method=="GET":
        bill=Bills.query.filter_by(BID=BID).first()
        return render_template("moreinfo.html",bill=bill,Aanum=Aanum)

@app.route("/bills/<int:BID>/<int:Aanum>", methods=["POST", "GET"])
def respons(BID, Aanum):
    bill=Bills.query.filter_by(BID=BID).first()
    if request.method=="GET":
    
        opinions=Opinions.query.filter_by(Aanum=Aanum, BID=BID).all()
        
        if opinions:
            opinions=Opinions.query.filter_by(BID=BID).all()
            return render_template("exists.html",Aanum=Aanum, BID=BID, opinions=opinions, bill=bill)

        opinions=Opinions.query.filter_by(BID=BID).all()
        return render_template("response.html",Aanum=Aanum, BID=BID, opinions=opinions, bill=bill)
    if request.method=="POST":
        engine = create_engine('sqlite:///aventusdb.sqlite3', echo=True)
        Session = sessionmaker(bind=engine)
        session = Session()
        metadata = MetaData()
        opinions = Table('opinions', metadata,
            Column('Aanum', Integer),
            Column('BID', Integer),
            Column('rating', Integer),
            Column('comments', String)
        )
        Aanum=Aanum
        BID=BID
        rating=request.form["rating"]
        comments=request.form["comments"]
        new=opinions.insert().values(
        Aanum=Aanum,
        BID=BID,
        rating=rating,
        comments=comments
        )
        session.execute(new)
        session.commit()
        x="/bills/"+str(Aanum)
        return redirect(x)

        
@app.route("/bills", methods=["POST", "GET"])

def bils():
    if request.method=="GET":
        bils=Bills.query.all()
        b={}
        for bill in bils:
            a=bill.BID
            b[a]=[]
        for bill in bils:
            a=bill.BID
            (v,w,x,y,z)=(bill.BName, bill.Ministry, bill.status, bill.Description, bill.year)
            b[a]=[v,w,x,y,z]
            arr=[]
            for (key,value) in b.items():
                value=b[key]
                arr.append(value)         
        return (arr)
    
if __name__=="__main__":
    app.run(debug=True)