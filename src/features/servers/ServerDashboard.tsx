import React from 'react';
import { ServerList } from './components/ServerList';
import { Header } from './components/Header';
import { Server } from '../../types/server';

interface ServerDashboardProps {
  servers: Server[];
  onDeleteServer: (id: string) => void;
  onServerStatusChange: (id: string, status: boolean) => void;
}

export function ServerDashboard({ 
  servers, 
  onDeleteServer, 
  onServerStatusChange 
}: ServerDashboardProps) {
  return (
    <>
      <Header serverCount={servers.length} />
      <ServerList 
        servers={servers} 
        onDeleteServer={onDeleteServer}
        onServerStatusChange={onServerStatusChange}
      />
    </>
  );
}