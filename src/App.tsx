import React, { useState } from 'react';
import { ServerDashboard } from './features/servers/ServerDashboard';
import { FloatingActionButton } from './components/FloatingActionButton';
import { AddModal } from './components/AddModal';
import { AddServerForm } from './features/servers/components/AddServerForm';
import { VPNConfig } from './features/network/components/VPNConfig';
import { VPNStatusIndicator } from './features/network/components/VPNStatusIndicator';
import { PingTester } from './features/network/components/PingTester';
import { VPNProvider } from './features/network/context/VPNContext';
import { Server } from './types/server';
import { VPNConfig as VPNConfigType } from './features/network/types/network';
import { createNewServer } from './features/servers/utils/serverUtils';

export default function App() {
  const [showServerModal, setShowServerModal] = useState(false);
  const [showVPNModal, setShowVPNModal] = useState(false);
  const [servers, setServers] = useState<Server[]>([]);

  const handleAddServer = (serverData: Omit<Server, 'id' | 'isOnline' | 'drives'>) => {
    const newServer = createNewServer(serverData);
    setServers([...servers, newServer]);
    setShowServerModal(false);
  };

  const handleAddVPN = (config: VPNConfigType) => {
    console.log('VPN Configuration:', config);
    setShowVPNModal(false);
  };

  const handleDeleteServer = (id: string) => {
    setServers(servers.filter(server => server.id !== id));
  };

  const handleServerStatusChange = (id: string, status: boolean) => {
    setServers(servers.map(server =>
      server.id === id ? { ...server, isOnline: status } : server
    ));
  };

  return (
    <VPNProvider>
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Server Manager</h1>
            <VPNStatusIndicator />
          </div>
          
          <PingTester />
          
          <ServerDashboard
            servers={servers}
            onDeleteServer={handleDeleteServer}
            onServerStatusChange={handleServerStatusChange}
          />
          
          <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
            <FloatingActionButton
              onClick={() => setShowVPNModal(true)}
              tooltip="Add VPN"
              icon="shield"
            />
            <FloatingActionButton
              onClick={() => setShowServerModal(true)}
              tooltip="Add Server"
              icon="plus"
            />
          </div>

          <AddModal
            isOpen={showServerModal}
            onClose={() => setShowServerModal(false)}
            title="Add New Server"
          >
            <AddServerForm onAddServer={handleAddServer} />
          </AddModal>

          <AddModal
            isOpen={showVPNModal}
            onClose={() => setShowVPNModal(false)}
            title="Configure VPN Connection"
          >
            <VPNConfig onSave={handleAddVPN} />
          </AddModal>
        </div>
      </div>
    </VPNProvider>
  );
}