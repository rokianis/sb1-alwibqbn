export interface Server {
  id: string;
  name: string;
  ip: string;
  login: string;
  password: string;
  isOnline?: boolean;
  drives?: DriveInfo[];
}

export interface DriveInfo {
  device: string;
  size: string;
  used: string;
  available: string;
  mountPoint: string;
}