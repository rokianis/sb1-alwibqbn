import React from 'react';
import { DriveStats } from '../utils/driveStats';
import { AlertTriangle, HardDrive } from 'lucide-react';

interface DrivesSummaryProps {
  stats: DriveStats;
}

export function DrivesSummary({ stats }: DrivesSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Overall Statistics */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Total Storage</div>
          <div className="text-white font-semibold">{stats.totalSize}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Used Space</div>
          <div className="text-white font-semibold">{stats.totalUsed}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-gray-400 mb-1">Available</div>
          <div className="text-white font-semibold">{stats.totalAvailable}</div>
        </div>
      </div>

      {/* Usage Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Usage</span>
          <span>{Math.round(stats.averageUsagePercentage)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              stats.averageUsagePercentage > 90
                ? 'bg-red-500'
                : stats.averageUsagePercentage > 75
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${stats.averageUsagePercentage}%` }}
          />
        </div>
      </div>

      {/* Critical Drives Warning */}
      {stats.criticalDrives.length > 0 && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-sm">
          <div className="flex items-center text-red-400 mb-2">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span>{stats.criticalDrives.length} drives critical</span>
          </div>
          <div className="space-y-1">
            {stats.criticalDrives.map((drive, index) => (
              <div key={index} className="text-red-300 text-xs flex items-center">
                <HardDrive className="w-3 h-3 mr-1" />
                {drive.device} ({drive.mountPoint})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}