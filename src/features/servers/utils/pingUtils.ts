export interface PingResult {
  isReachable: boolean;
  latency?: number;
  error?: string;
}

export async function pingServer(ip: string): Promise<PingResult> {
  try {
    const startTime = performance.now();
    const response = await fetch(`http://${ip}:80`, { 
      mode: 'no-cors',
      cache: 'no-cache',
      timeout: 3000
    });
    const endTime = performance.now();
    
    return {
      isReachable: true,
      latency: Math.round(endTime - startTime)
    };
  } catch (error) {
    return {
      isReachable: false,
      error: 'Server unreachable'
    };
  }
}