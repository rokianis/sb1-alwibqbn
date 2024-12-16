import React from 'react';
import { Server } from '../types/server';
import { ServerCard } from './ServerCard';

interface ServerListProps {
  servers: Server[];
  onDeleteServer: (id: string) => void;
}

export function ServerList({ servers, onDeleteServer }: ServerListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {servers.map((server) => (
        <ServerCard
          key={server.id}
          server={server}
          onDelete={onDeleteServer}
        />
      ))}
    </div>
  );
}