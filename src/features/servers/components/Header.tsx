import React from 'react';
import { Network } from 'lucide-react';

interface HeaderProps {
  serverCount: number;
}

export function Header({ serverCount }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Network className="w-8 h-8 text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold text-white">
          Ubuntu Server Manager
        </h1>
      </div>
      <div className="text-sm text-gray-400">
        {serverCount} Server{serverCount !== 1 ? 's' : ''} Connected
      </div>
    </div>
  );
}