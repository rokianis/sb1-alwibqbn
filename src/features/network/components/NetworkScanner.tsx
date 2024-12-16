import React, { useState } from 'react';
import { Scan, AlertCircle } from 'lucide-react';
import { NetworkScan } from '../types/network';

interface NetworkScannerProps {
  onScanComplete: (results: NetworkScan[]) => void;
}

export function NetworkScanner({ onScanComplete }: NetworkScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [subnet, setSubnet] = useState('192.168.1');
  const [range, setRange] = useState({ start: 1, end: 254 });

  const handleScan = async () => {
    setIsScanning(true);
    // In a real implementation, this would use a backend service
    // to perform the actual network scanning
    setTimeout(() => {
      const mockResults: NetworkScan[] = [
        {
          ip: '192.168.1.100',
          hostname: 'ubuntu-server-1',
          ports: [22, 80, 443],
          isReachable: true,
          lastScan: new Date(),
        },
      ];
      onScanComplete(mockResults);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Scan className="w-5 h-5 mr-2" />
        Network Scanner
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Subnet
          </label>
          <input
            type="text"
            value={subnet}
            onChange={(e) => setSubnet(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="192.168.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Start IP
          </label>
          <input
            type="number"
            min="1"
            max="254"
            value={range.start}
            onChange={(e) => setRange({ ...range, start: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            End IP
          </label>
          <input
            type="number"
            min="1"
            max="254"
            value={range.end}
            onChange={(e) => setRange({ ...range, end: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isScanning ? 'Scanning...' : 'Scan Network'}
        </button>
        
        <div className="text-sm text-gray-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          Scans ports: 22, 80, 443
        </div>
      </div>
    </div>
  );
}