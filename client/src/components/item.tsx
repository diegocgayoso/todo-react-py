import { FormEvent, useState } from "react";
import { ItemProps } from "../interfaces/interfaces";


export const Item = ({ task }: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.description);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`flex items-center justify-between p-4 bg-gray-700 rounded-lg mb-2 ${
      task.status ? 'opacity-50 line-through' : ''
    }`}>
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.status}
          className="w-4 h-4"
        />
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="bg-gray-600 text-white px-2 py-1 rounded w-full"
              autoFocus
            />
          </form>
        ) : (
          <span
            className="flex-1 cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.description}
          </span>
        )}
      </div>
    </div>
  );
};
