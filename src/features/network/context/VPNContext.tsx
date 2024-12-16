import React, { createContext, useContext, useState, useEffect } from 'react';
import { VPNConfig, NetworkStatus } from '../types/network';
import { VPNService } from '../../../services/vpn';

interface VPNContextType {
  status: NetworkStatus;
  connect: (config: VPNConfig) => Promise<void>;
  disconnect: () => Promise<void>;
}

const VPNContext = createContext<VPNContextType | null>(null);

export function VPNProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<NetworkStatus>({
    isVPNConnected: false,
  });

  useEffect(() => {
    const vpnService = VPNService.getInstance();
    vpnService.onStatusChange(setStatus);
    setStatus(vpnService.getStatus());
  }, []);

  const connect = async (config: VPNConfig) => {
    try {
      await VPNService.getInstance().connect(config);
    } catch (error) {
      setStatus({
        isVPNConnected: false,
        error: 'Failed to connect to VPN',
      });
    }
  };

  const disconnect = async () => {
    await VPNService.getInstance().disconnect();
  };

  return (
    <VPNContext.Provider value={{ status, connect, disconnect }}>
      {children}
    </VPNContext.Provider>
  );
}

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error('useVPN must be used within a VPNProvider');
  }
  return context;
};