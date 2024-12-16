import { Server } from '../../../types/server';

export function createNewServer(
  newServer: Omit<Server, 'id' | 'isOnline' | 'drives'>
): Server {
  return {
    ...newServer,
    id: Date.now().toString(),
    isOnline: Math.random() > 0.5,
    drives: [
      {
        device: '/dev/sda1',
        size: '256GB',
        used: '128GB',
        available: '128GB',
        mountPoint: '/',
      },
    ],
  };
}