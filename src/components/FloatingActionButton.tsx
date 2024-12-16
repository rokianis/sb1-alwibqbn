import React from 'react';
import { Plus, Shield } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  tooltip: string;
  icon: 'plus' | 'shield';
}

export function FloatingActionButton({ onClick, tooltip, icon }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
      title={tooltip}
    >
      {icon === 'plus' ? (
        <Plus className="w-6 h-6" />
      ) : (
        <Shield className="w-6 h-6" />
      )}
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </span>
    </button>
  );
}