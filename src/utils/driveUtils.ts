import { DriveInfo } from '../types/server';

function convertToGB(size: string): number {
  const value = parseFloat(size.replace(/[^0-9.]/g, ''));
  const unit = size.replace(/[0-9.]/g, '').toUpperCase();
  
  switch (unit) {
    case 'TB':
      return value * 1024;
    case 'GB':
      return value;
    case 'MB':
      return value / 1024;
    default:
      return 0;
  }
}

export function calculateDriveUsagePercentage(drive: DriveInfo): number {
  const usedGB = convertToGB(drive.used);
  const totalGB = convertToGB(drive.size);
  
  if (isNaN(usedGB) || isNaN(totalGB) || totalGB === 0) {
    return 0;
  }
  
  const percentage = (usedGB / totalGB) * 100;
  return Math.min(Math.max(percentage, 0), 100); // Ensure value is between 0 and 100
}