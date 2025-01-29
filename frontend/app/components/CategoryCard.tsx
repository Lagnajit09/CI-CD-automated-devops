"use client";

import { Category } from '../types';
import { Folder } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  todoCount: number;
}

export function CategoryCard({ category, todoCount }: CategoryCardProps) {
  return (
    <div className={`${category.color} rounded-xl p-6 relative group cursor-pointer transition-all hover:shadow-lg`}>
      <div className="absolute top-4 right-4">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24">
            <path d="M12 12V12.01M8 12V12.01M16 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      
      <Folder className="w-8 h-8 text-gray-700 mb-4" />
      
      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{todoCount} tasks</p>
    </div>
  );
}