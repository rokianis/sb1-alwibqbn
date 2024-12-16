import React, { useState } from 'react';
import { DriveInfo } from '../../../types/server';
import { ChevronDown, ChevronUp, HardDrive } from 'lucide-react';
import { calculateDriveUsagePercentage } from '../../../utils/driveUtils';

interface DrivesDetailProps {
  drives: DriveInfo[];
}

export function DrivesDetail({ drives }: DrivesDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayDrives = isExpanded ? drives : drives.slice(0, 5);

  const groupedDrives = displayDrives.reduce((acc, drive) => {
    const group = drive.mountPoint.startsWith('/data')
      ? 'Data'
      : drive.mountPoint.startsWith('/backup')
      ? 'Backup'
      : drive.mountPoint === '/'
      ? 'System'
      : 'Other';

    return {
      ...acc,
      [group]: [...(acc[group] || []), drive],
    };
  }, {} as Record<string, DriveInfo[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedDrives).map(([group, groupDrives]) => (
        <div key={group} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400">{group}</h4>
          <div className="space-y-2">
            {groupDrives.map((drive, index) => (
              <div key={index} className="text-xs text-gray-400">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <HardDrive className="w-3 h-3 mr-1" />
                    <span>{drive.device}</span>
                  </div>
                  <span>{drive.mountPoint}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          calculateDriveUsagePercentage(drive) > 90
                            ? 'bg-red-500'
                            : calculateDriveUsagePercentage(drive) > 75
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                        style={{
                          width: `${calculateDriveUsagePercentage(drive)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="min-w-[100px] text-right">
                    {drive.used}/{drive.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {drives.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-blue-400 hover:text-blue-300 text-sm mt-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show All ({drives.length} drives)
            </>
          )}
        </button>
      )}
    </div>
  );
}