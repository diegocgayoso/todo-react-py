import { ItemProps } from "../interfaces/interfaces";

export const Item = ({ task, onEdit, onDelete, onChecked }: ItemProps) => {

  const editTask = () => {
    onEdit(task);
  };

  const deleteTask =() => {
    onDelete(task);
  }

  const checkTask = () => {
    onChecked(task);
  }

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
          // disabled={task.status === true}
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
