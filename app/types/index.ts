export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}