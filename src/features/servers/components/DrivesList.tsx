import React from 'react';
import { DriveInfo } from '../../../types/server';
import { calculateDriveUsagePercentage } from '../../../utils/driveUtils';

interface DrivesListProps {
  drives: DriveInfo[];
}

export function DrivesList({ drives }: DrivesListProps) {
  return (
    <div className="mt-4">
      <div className="space-y-2">
        {drives.map((drive, index) => (
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
  );
}