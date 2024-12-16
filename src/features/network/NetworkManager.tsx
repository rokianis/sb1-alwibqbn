import React, { useState } from 'react';
import { VPNStatus } from './components/VPNStatus';
import { VPNConfig } from './components/VPNConfig';
import { NetworkScanner } from './components/NetworkScanner';
import { NetworkStatus, NetworkScan, VPNConfig as VPNConfigType } from './types/network';

export function NetworkManager() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isVPNConnected: false,
  });

  const [scanResults, setScanResults] = useState<NetworkScan[]>([]);

  const handleVPNConfig = (config: VPNConfigType) => {
    // In a real implementation, this would connect to the VPN
    console.log('Connecting to VPN:', config);
    setNetworkStatus({
      isVPNConnected: true,
      currentIP: '10.0.0.2',
      latency: 45,
      subnet: '10.0.0.0/24',
    });
  };

  const handleScanComplete = (results: NetworkScan[]) => {
    setScanResults(results);
  };

  return (
    <div className="space-y-6">
      <VPNStatus status={networkStatus} />
      <VPNConfig onSave={handleVPNConfig} />
      <NetworkScanner onScanComplete={handleScanComplete} />
      
      {scanResults.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Scan Results</h3>
          <div className="space-y-4">
            {scanResults.map((result) => (
              <div
                key={result.ip}
                className="bg-gray-700 rounded-lg p-4 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{result.hostname || result.ip}</p>
                    <p className="text-sm text-gray-400">IP: {result.ip}</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Open ports: {result.ports.join(', ')}</p>
                    <p>Last scan: {result.lastScan.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}