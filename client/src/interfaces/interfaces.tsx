export interface Tasks {
  tasks: Task[];
}

export interface Task {
  id?: number;
  description: string;
  status: boolean;
}

export interface Users {
  users: string[];
}

export interface ItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export interface ApiResponse {
  message: string;
}