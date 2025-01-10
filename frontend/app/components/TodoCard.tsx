"use client";

import { Todo } from "../types";
import { format } from "date-fns";
import { Check, Trash2, ExternalLink } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  categoryColor: string;
}

export function TodoCard({
  todo,
  onToggle,
  onDelete,
  categoryColor,
}: TodoCardProps) {
  return (
    <div
      className={`rounded-lg p-6 relative group transition-all hover:shadow-md ${categoryColor}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-gray-500">
              {format(new Date(todo.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(todo.id)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Check
              className={`w-5 h-5 ${
                todo.completed ? "text-green-600" : "text-gray-400"
              }`}
            />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
