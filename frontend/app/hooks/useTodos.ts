"use client";

import { useEffect, useState } from 'react';
import { Todo, Category } from '../types';

const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: 'bg-violet-200' },
  { id: '2', name: 'Work', color: 'bg-teal-200' },
  { id: '3', name: 'Shopping', color: 'bg-yellow-200' },
  { id: '4', name: 'Health', color: 'bg-cyan-200' },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const saveTodos = (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    saveTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}