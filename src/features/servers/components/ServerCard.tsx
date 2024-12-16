import React, { useState } from 'react';
import { Server } from '../../../types/server';
import { HardDrive, Server as ServerIcon, Trash2, Package } from 'lucide-react';
import { ServerStatus } from './ServerStatus';
import { DrivesSummary } from './DrivesSummary';
import { DrivesDetail } from './DrivesDetail';
import { PackageManager } from './PackageManager';
import { calculateDriveStats } from '../utils/driveStats';

interface ServerCardProps {
  server: Server;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: boolean) => void;
}

export function ServerCard({ server, onDelete, onStatusChange }: ServerCardProps) {
  const [showPackageManager, setShowPackageManager] = useState(false);
  const driveStats = server.drives ? calculateDriveStats(server.drives) : null;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ServerIcon className="w-6 h-6 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">{server.name}</h3>
        </div>
        <ServerStatus 
          ip={server.ip}
          isOnline={server.isOnline || false}
          onStatusChange={(status) => onStatusChange(server.id, status)}
        />
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <p>IP: {server.ip}</p>
        <p>Login: {server.login}</p>
        {server.drives && (
          <div className="flex items-center mt-3">
            <HardDrive className="w-4 h-4 mr-2" />
            <span>{server.drives.length} drives</span>
          </div>
        )}
      </div>

      {driveStats && (
        <div className="mt-4 space-y-4">
          <DrivesSummary stats={driveStats} />
          <DrivesDetail drives={server.drives || []} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={() => setShowPackageManager(!showPackageManager)}
          className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
        >
          <Package className="w-4 h-4 mr-1" />
          {showPackageManager ? 'Hide Packages' : 'Manage Packages'}
        </button>

        <button
          onClick={() => onDelete(server.id)}
          className="flex items-center text-red-400 hover:text-red-300 text-sm"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Remove Server
        </button>
      </div>

      {showPackageManager && (
        <div className="mt-4">
          <PackageManager
            serverIp={server.ip}
            serverLogin={server.login}
          />
        </div>
      )}
    </div>
  );
}