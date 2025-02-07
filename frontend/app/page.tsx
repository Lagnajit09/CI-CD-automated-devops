"use client";

import { useTodos } from "./hooks/useTodos";
import { TodoCard } from "./components/TodoCard";
import { AddTodoDialog } from "./components/AddTodoDialog";
import { Search } from "lucide-react";

export default function Home() {
  const { todos, categories, addTodo, toggleTodo, deleteTodo } = useTodos();

  console.log(process.env.NEXT_PUBLIC_SERVER_URL);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <AddTodoDialog categories={categories} onAddTodo={addTodo} />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
            <div className="flex items-center gap-2">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Today
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                This Week
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                This Month
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todos.map((todo) => {
              const category = categories.find((c) => c.id === todo.categoryId);
              return (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  categoryColor={category?.color || "bg-gray-100"}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
