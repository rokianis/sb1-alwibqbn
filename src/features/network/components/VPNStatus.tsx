import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import { NetworkStatus } from '../types/network';

interface VPNStatusProps {
  status: NetworkStatus;
}

export function VPNStatus({ status }: VPNStatusProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {status.isVPNConnected ? (
            <Shield className="w-5 h-5 text-green-400" />
          ) : (
            <ShieldOff className="w-5 h-5 text-red-400" />
          )}
          <span className="text-white font-medium">
            VPN {status.isVPNConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {status.isVPNConnected && (
          <div className="text-sm text-gray-400">
            <p>IP: {status.currentIP}</p>
            <p>Latency: {status.latency}ms</p>
          </div>
        )}
      </div>
    </div>
  );
}