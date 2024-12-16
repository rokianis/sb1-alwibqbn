import React, { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { pingServer, PingResult } from '../utils/pingUtils';

interface ServerStatusProps {
  ip: string;
  isOnline: boolean;
  onStatusChange: (status: boolean) => void;
}

export function ServerStatus({ ip, isOnline, onStatusChange }: ServerStatusProps) {
  const [pingResult, setPingResult] = useState<PingResult | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const checkStatus = async () => {
    setIsPinging(true);
    const result = await pingServer(ip);
    setPingResult(result);
    onStatusChange(result.isReachable);
    setIsPinging(false);
  };

  useEffect(() => {
    // Initial check
    checkStatus();
    
    // Set up periodic checking
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [ip]);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={checkStatus}
        disabled={isPinging}
        className="p-1 hover:bg-gray-700 rounded-full transition-colors"
        title="Check connection"
      >
        <Activity className={`w-4 h-4 ${isPinging ? 'animate-spin text-blue-400' : 'text-gray-400'}`} />
      </button>
      
      {isOnline ? (
        <span className="flex items-center text-green-400">
          <Wifi className="w-4 h-4 mr-1" />
          {pingResult?.latency ? `${pingResult.latency}ms` : 'Connected'}
        </span>
      ) : (
        <span className="flex items-center text-red-400">
          <WifiOff className="w-4 h-4 mr-1" />
          Offline
        </span>
      )}
    </div>
  );
}