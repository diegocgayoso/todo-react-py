import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Item } from "./components/item";
import { ApiResponse, Task } from "./interfaces/interfaces";

function App() {
  const [task, setTask] = useState<Task>({
    description: "",
    status: false,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchDataTasks = async () => {
    const response = await axios.get<Task[]>("http://localhost:8080/tasks");
    const data: Task[] = response.data;
    setTasks(data);
  };

  const refreshTasks = async () => {
    await fetchDataTasks();
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    // console.log("adding");
    const url = task.id
      ? `http://localhost:8080/tasks/${task.id}`
      : "http://localhost:8080/tasks";

    const method = task.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Erro na criação");

      const result: ApiResponse = await response.json();
      alert(result.message);
      await refreshTasks();
      setTask({
        description: "",
        status: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (taskToEdit: Task) => {
    setTask(taskToEdit);
  };

  const deleteTask = async (taskToDelete: Task) => {
    
    console.log("deletando", taskToDelete.id);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro na exclusão");
      const result: ApiResponse = await response.json();
      alert(result.message);
      refreshTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkTask = async (taskToCheck: Task) => {
    console.log("editando", taskToCheck.id);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskToCheck.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskToCheck,
          status: true,
        }),
      });
      if (!response.ok) throw new Error("Erro na edição");
      const result: ApiResponse = await response.json();
      refreshTasks();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDataTasks();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-4">
      {/* #Header */}
      <header className="w-96">
        <h1 className="text-2xl">
          To do <br /> <span className="font-bold">List</span>
        </h1>
      </header>
      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Crie novas tarefas"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
        >
          {task.id ? "Editar task" : "Adicionar taks"}
        </button>
      </form>
      <div className="sm:w-1/2 h-96 rounded-lg p-4 overflow-auto">
        {tasks.length === 0 && (
          <p className="text-center">Que tal criar uma nova tarefa?</p>
        )}
        {tasks.map((task, index) => (
          <Item
            key={index}
            task={task}
            onEdit={handleEdit}
            onDelete={deleteTask}
            onChecked={checkTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
