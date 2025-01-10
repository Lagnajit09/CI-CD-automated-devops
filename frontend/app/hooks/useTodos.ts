"use client";

import { useEffect, useState } from "react";
import { Todo, Category } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial todos and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTodos(data.todos);
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTodo = async (
    todo: Omit<Todo, "id" | "createdAt" | "completed">
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
      throw err;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${id}/toggle`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) throw new Error("Failed to toggle todo");
      const updatedTodo = await response.json();

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      throw err;
    }
  };

  return {
    todos,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    loading,
    error,
  };
}
