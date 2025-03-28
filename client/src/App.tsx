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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("adding");

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Erro na criação");

      const result: ApiResponse = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
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
      {/* <Form onSubmit={handleSubmit} /> */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Add a new task"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
      <div className="w-96 h-96 rounded-lg p-4 overflow-auto">
        {tasks.map((task, index) => (
          <Item key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
