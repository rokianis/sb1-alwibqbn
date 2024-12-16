import { VPNConfig, NetworkStatus } from '../features/network/types/network';

export class VPNService {
  private static instance: VPNService;
  private status: NetworkStatus = {
    isVPNConnected: false
  };
  private updateCallback?: (status: NetworkStatus) => void;

  private constructor() {}

  static getInstance(): VPNService {
    if (!VPNService.instance) {
      VPNService.instance = new VPNService();
    }
    return VPNService.instance;
  }

  async connect(config: VPNConfig): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful connection
    this.status = {
      isVPNConnected: true,
      currentIP: '10.0.0.' + Math.floor(Math.random() * 255),
      latency: Math.floor(Math.random() * 20) + 30,
      subnet: '10.0.0.0/24',
      connectionName: config.name
    };

    this.notifyStatusUpdate();
    this.startMonitoring();
  }

  async disconnect(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.status = {
      isVPNConnected: false
    };
    this.notifyStatusUpdate();
  }

  getStatus(): NetworkStatus {
    return this.status;
  }

  onStatusChange(callback: (status: NetworkStatus) => void) {
    this.updateCallback = callback;
  }

  private notifyStatusUpdate() {
    if (this.updateCallback) {
      this.updateCallback(this.status);
    }
  }

  private startMonitoring() {
    setInterval(() => {
      if (this.status.isVPNConnected) {
        this.status = {
          ...this.status,
          latency: Math.floor(Math.random() * 20) + 30
        };
        this.notifyStatusUpdate();
      }
    }, 5000);
  }
}