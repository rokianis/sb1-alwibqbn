import React, { useState } from 'react';
import { Server } from '../types/server';
import { Plus } from 'lucide-react';

interface AddServerFormProps {
  onAddServer: (server: Omit<Server, 'id' | 'isOnline' | 'drives'>) => void;
}

export function AddServerForm({ onAddServer }: AddServerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    login: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddServer(formData);
    setFormData({ name: '', ip: '', login: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
        <Plus className="w-5 h-5 mr-2" />
        Add New Server
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Server Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="Production Server 1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            IP Address
          </label>
          <input
            type="text"
            required
            value={formData.ip}
            onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="192.168.1.100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Login
          </label>
          <input
            type="text"
            required
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add Server
      </button>
    </form>
  );
}