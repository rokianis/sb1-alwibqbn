import React from 'react';
import { Server } from '../types/server';
import { HardDrive, Server as ServerIcon, Trash2, Power } from 'lucide-react';
import { calculateDriveUsagePercentage } from '../utils/driveUtils';

interface ServerCardProps {
  server: Server;
  onDelete: (id: string) => void;
}

export function ServerCard({ server, onDelete }: ServerCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ServerIcon className="w-6 h-6 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">{server.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              server.isOnline
                ? 'bg-green-900 text-green-300'
                : 'bg-red-900 text-red-300'
            }`}
          >
            <Power className="w-3 h-3 mr-1" />
            {server.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <p>IP: {server.ip}</p>
        <p>Login: {server.login}</p>
        <div className="flex items-center mt-3">
          <HardDrive className="w-4 h-4 mr-2" />
          <span>{server.drives?.length || 0} drives</span>
        </div>
      </div>

      {server.drives && server.drives.length > 0 && (
        <div className="mt-4">
          <div className="space-y-2">
            {server.drives.map((drive, index) => (
              <div key={index} className="text-xs text-gray-400">
                <p>{`${drive.device} (${drive.used}/${drive.size})`}</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{
                      width: `${calculateDriveUsagePercentage(drive)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onDelete(server.id)}
        className="mt-4 flex items-center text-red-400 hover:text-red-300 text-sm"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Remove Server
      </button>
    </div>
  );
}