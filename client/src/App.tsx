import { 
  useEffect, 
  useState }           from "react";
import                      "./App.css";
import axios           from "axios";
import { Item }        from "./components/item";
import { Task } from "./interfaces/interfaces";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchDataTasks = async () => {
    const response = await axios.get<Task[]>("http://localhost:8080/tasks");
    const data : Task[] = response.data;
    setTasks(data);
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
      <div className="w-96 h-96 rounded-lg p-4 overflow-auto">
        {tasks.map((task, index) => (
          <Item
            key={index}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
