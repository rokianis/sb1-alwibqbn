export interface VPNConfig {
  name: string;
  host: string;
  port: number;
  protocol: 'udp' | 'tcp';
  certificate?: string;
  username?: string;
  password?: string;
}

export interface NetworkStatus {
  isVPNConnected: boolean;
  currentIP?: string;
  latency?: number;
  subnet?: string;
}

export interface NetworkScan {
  ip: string;
  hostname?: string;
  ports: number[];
  isReachable: boolean;
  lastScan: Date;
}