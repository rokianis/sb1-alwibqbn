import { DriveInfo } from '../../../types/server';

export interface DriveStats {
  totalSize: string;
  totalUsed: string;
  totalAvailable: string;
  averageUsagePercentage: number;
  criticalDrives: DriveInfo[];
  mountPoints: {
    root: DriveInfo[];
    data: DriveInfo[];
    backup: DriveInfo[];
    other: DriveInfo[];
  };
}

function convertToBytes(size: string): number {
  const value = parseFloat(size.replace(/[^0-9.]/g, ''));
  const unit = size.replace(/[0-9.]/g, '').toUpperCase();
  
  switch (unit) {
    case 'PB': return value * 1024 * 1024 * 1024 * 1024;
    case 'TB': return value * 1024 * 1024 * 1024;
    case 'GB': return value * 1024 * 1024;
    case 'MB': return value * 1024;
    case 'KB': return value;
    default: return value;
  }
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let value = bytes;
  let unitIndex = 0;
  
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  
  return `${Math.round(value * 100) / 100}${units[unitIndex]}`;
}

export function calculateDriveStats(drives: DriveInfo[]): DriveStats {
  let totalSizeBytes = 0;
  let totalUsedBytes = 0;
  
  // Calculate totals
  drives.forEach(drive => {
    totalSizeBytes += convertToBytes(drive.size);
    totalUsedBytes += convertToBytes(drive.used);
  });
  
  // Group by mount points
  const mountPoints = {
    root: drives.filter(d => d.mountPoint === '/'),
    data: drives.filter(d => d.mountPoint.startsWith('/data')),
    backup: drives.filter(d => d.mountPoint.startsWith('/backup')),
    other: drives.filter(d => !['/', '/data', '/backup'].includes(d.mountPoint))
  };
  
  // Find critical drives (>90% usage)
  const criticalDrives = drives.filter(drive => {
    const usedBytes = convertToBytes(drive.used);
    const totalBytes = convertToBytes(drive.size);
    return (usedBytes / totalBytes) * 100 > 90;
  });
  
  return {
    totalSize: formatBytes(totalSizeBytes),
    totalUsed: formatBytes(totalUsedBytes),
    totalAvailable: formatBytes(totalSizeBytes - totalUsedBytes),
    averageUsagePercentage: (totalUsedBytes / totalSizeBytes) * 100,
    criticalDrives,
    mountPoints
  };
}