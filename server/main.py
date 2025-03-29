from flask import Flask, jsonify, request
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

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(data['description'], data['status'])
    session.add(new_task)
    session.commit()
    return jsonify({'message': 'Task created successfully'}), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def complete_task(task_id):
    task = session.query(Task).get(task_id)
    if task:
        task.status = True
        session.commit()
        return jsonify({'message': 'Task completed successfully'}), 201
    else:
        return jsonify({'message': 'Task not found'}), 404
    
@app.route("/tasks/<int:task_id>", methods=["PUT"])   
def edit_task(task_id):
    data = request.get_json()
    task = session.query(Task).get(task_id)
    if task:
        task.description = data['description']
        session.commit()
        return jsonify({'message': 'Task edited successfully'}), 201
    else:
        return jsonify({'message': 'Task not found'}), 404


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = session.query(Task).get(task_id)
    if task:
        session.delete(task)
        session.commit()
        return jsonify({'message': 'Task deleted successfully'}), 201
    else:
        return jsonify({'message': 'Task not found'}), 404
    

if __name__ == "__main__":
    app.run(debug=True, port=8080)
