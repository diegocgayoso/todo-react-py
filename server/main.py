from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base

app = Flask(__name__)
cors = CORS(app, origins="*")

#Criar banco de dados
database = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=database)
session = Session()

Base = declarative_base()

#Criar tabelas
class Task(Base):
    __tablename__ = "tasks"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    description = Column("description", String(50))
    status = Column("status", Boolean, default=False)
    
    def __init__(self, description, status=False):
        self.description = description
        self.status = status
        
Base.metadata.create_all(bind=database)

#Rotas
@app.route("/")
def index():
    return "Hello Api Tasks"
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = session.query(Task).all()
    tasks_list = [{
        'id': task.id,
        'description': task.description,
        'status': task.status
    } for task in tasks]
    return jsonify(tasks_list)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
