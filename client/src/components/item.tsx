import { ApiResponse, ItemProps } from "../interfaces/interfaces";

export const Item = ({ task, onEdit }: ItemProps) => {
  const checkTask = async () => {
    console.log("editando", task.id);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          status: !task.status,
        }),
      });
      if (!response.ok) throw new Error("Erro na edição");
      const result: ApiResponse = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteTask = async () => {
    console.log("deletando", task.id);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro na exclusão");
      const result: ApiResponse = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const editTask = () => {
    onEdit(task);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 bg-gray-700 rounded-lg mb-2 ${
        task.status ? "opacity-50 line-through" : ""
      }`}
    >
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.status}
          onChange={checkTask}
          className="w-4 h-4"
          disabled={task.status === true}
        />

        <p className="flex-1 cursor-pointer">{task.description}</p>
        <button
          onClick={editTask}
          className="material-symbols-outlined hover:cursor-pointer hover:bg-gray-400 rounded-md p-2 "
        >
          <span className="">edit</span>
        </button>
        <button
          onClick={deleteTask}
          className="material-symbols-outlined hover:cursor-pointer hover:bg-gray-400 rounded-md p-2"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};
