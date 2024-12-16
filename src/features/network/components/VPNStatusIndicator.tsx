import React from 'react';
import { Shield, ShieldOff, Activity } from 'lucide-react';
import { useVPN } from '../context/VPNContext';

export function VPNStatusIndicator() {
  const { status, disconnect } = useVPN();

  return (
    <div className="flex items-center space-x-3 bg-gray-800 rounded-lg px-4 py-2">
      {status.isVPNConnected ? (
        <>
          <Shield className="w-5 h-5 text-green-400" />
          <div className="flex flex-col">
            <span className="text-sm text-white">
              {status.connectionName || 'VPN Connected'}
            </span>
            <span className="text-xs text-gray-400">
              IP: {status.currentIP} ({status.latency}ms)
            </span>
          </div>
          <button
            onClick={() => disconnect()}
            className="ml-2 text-sm text-red-400 hover:text-red-300"
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <ShieldOff className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">VPN Disconnected</span>
        </>
      )}
      <Activity className="w-4 h-4 text-gray-400" />
    </div>
  );
}