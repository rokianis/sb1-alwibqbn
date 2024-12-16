import React, { useState } from 'react';
import { Package, Terminal, Check, AlertCircle, Loader } from 'lucide-react';

interface PackageManagerProps {
  serverIp: string;
  serverLogin: string;
}

interface PackageInstallStatus {
  status: 'pending' | 'success' | 'error';
  message: string;
}

const REQUIRED_PACKAGES = [
  { name: 'erlang', description: 'Erlang programming language' },
  { name: 'libssl-dev', description: 'SSL development libraries' },
  { name: 'libgmp-dev', description: 'GNU MP development libraries' },
  { name: 'libsqlite3-dev', description: 'SQLite3 development libraries' },
  { name: 'make', description: 'Build management tool' },
  { name: 'cmake', description: 'Cross-platform build system' },
  { name: 'gcc', description: 'GNU C compiler' },
  { name: 'g++', description: 'GNU C++ compiler' },
  { name: 'cockpit', description: 'Web-based server management interface' },
  { name: 'nfs-common', description: 'NFS support files' },
];

export function PackageManager({ serverIp, serverLogin }: PackageManagerProps) {
  const [installStatus, setInstallStatus] = useState<PackageInstallStatus | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  const installPackages = async () => {
    setIsInstalling(true);
    setInstallStatus({ status: 'pending', message: 'Installing packages...' });

    try {
      // In a real implementation, this would make an API call to your backend
      // which would then execute the commands on the remote server via SSH
      const command = `sudo apt update && sudo DEBIAN_FRONTEND=noninteractive apt install -y ${REQUIRED_PACKAGES.map(p => p.name).join(' ')}`;
      
      // Simulated delay to represent installation time
      await new Promise(resolve => setTimeout(resolve, 2000));

      setInstallStatus({
        status: 'success',
        message: 'All packages installed successfully'
      });
    } catch (error) {
      setInstallStatus({
        status: 'error',
        message: 'Failed to install packages. Please check server connectivity and permissions.'
      });
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Required Packages
        </h3>
        <button
          onClick={installPackages}
          disabled={isInstalling}
          className={`px-4 py-2 rounded-md flex items-center ${
            isInstalling
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {isInstalling ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Installing...
            </>
          ) : (
            <>
              <Terminal className="w-4 h-4 mr-2" />
              Install All
            </>
          )}
        </button>
      </div>

      {/* Package List */}
      <div className="space-y-2 mb-4">
        {REQUIRED_PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className="flex items-center justify-between p-2 rounded-md bg-gray-700/50"
          >
            <div>
              <span className="text-white font-medium">{pkg.name}</span>
              <p className="text-sm text-gray-400">{pkg.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Installation Status */}
      {installStatus && (
        <div
          className={`mt-4 p-3 rounded-md flex items-center ${
            installStatus.status === 'success'
              ? 'bg-green-900/30 border border-green-700'
              : installStatus.status === 'error'
              ? 'bg-red-900/30 border border-red-700'
              : 'bg-blue-900/30 border border-blue-700'
          }`}
        >
          {installStatus.status === 'success' ? (
            <Check className="w-5 h-5 text-green-400 mr-2" />
          ) : installStatus.status === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          ) : (
            <Loader className="w-5 h-5 text-blue-400 mr-2 animate-spin" />
          )}
          <span
            className={`text-sm ${
              installStatus.status === 'success'
                ? 'text-green-400'
                : installStatus.status === 'error'
                ? 'text-red-400'
                : 'text-blue-400'
            }`}
          >
            {installStatus.message}
          </span>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <p>Note: Installation requires sudo privileges on the remote server.</p>
      </div>
    </div>
  );
}