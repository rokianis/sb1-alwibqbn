import React, { useState } from 'react';
import { Key, Upload, Shield } from 'lucide-react';
import { VPNConfig as VPNConfigType } from '../types/network';
import { OVPNFileUpload } from './OVPNFileUpload';
import { useVPN } from '../context/VPNContext';

interface VPNConfigProps {
  onSave: (config: VPNConfigType) => void;
}

export function VPNConfig({ onSave }: VPNConfigProps) {
  const { connect, status } = useVPN();
  const [config, setConfig] = useState<VPNConfigType>({
    name: '',
    host: '',
    port: 1194,
    protocol: 'udp',
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    setIsConnecting(true);
    try {
      await connect(config);
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOVPNConfig = (parsedConfig: Partial<VPNConfigType>) => {
    setConfig(prev => ({
      ...prev,
      ...parsedConfig,
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Key className="w-5 h-5 mr-2" />
        VPN Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <OVPNFileUpload onConfigParsed={handleOVPNConfig} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Connection Name
            </label>
            <input
              type="text"
              required
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Office VPN"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Host
            </label>
            <input
              type="text"
              required
              value={config.host}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="vpn.company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Port
            </label>
            <input
              type="number"
              required
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Protocol
            </label>
            <select
              value={config.protocol}
              onChange={(e) => setConfig({ ...config, protocol: e.target.value as 'udp' | 'tcp' })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="udp">UDP</option>
              <option value="tcp">TCP</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username (Optional)
            </label>
            <input
              type="text"
              value={config.username || ''}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="vpn_user"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password (Optional)
            </label>
            <input
              type="password"
              value={config.password || ''}
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isConnecting}
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
            isConnecting
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          <Shield className="w-5 h-5" />
          <span>
            {isConnecting ? 'Connecting...' : status.isVPNConnected ? 'Reconnect VPN' : 'Connect VPN'}
          </span>
        </button>

        {status.error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-md text-red-400 text-sm">
            {status.error}
          </div>
        )}
      </form>
    </div>
  );
}