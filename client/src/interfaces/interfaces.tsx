export interface Tasks {
  tasks: Task[];
}

export interface Task {
  description: string;
  status: boolean;
}

export interface Users {
  users: string[];
}

export interface ItemProps {
  task: Task;
}

export interface ApiResponse {
  message: string;
}