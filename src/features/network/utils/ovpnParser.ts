interface ParsedOVPNConfig {
  remote?: string;
  port?: number;
  proto?: string;
  auth?: string;
  cipher?: string;
  ca?: string;
  cert?: string;
  key?: string;
}

export function parseOVPNFile(content: string): ParsedOVPNConfig {
  const config: ParsedOVPNConfig = {};
  const lines = content.split('\n');

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('remote ')) {
      const [, host] = trimmedLine.split(/\s+/);
      config.remote = host;
    } else if (trimmedLine.startsWith('port ')) {
      const [, port] = trimmedLine.split(/\s+/);
      config.port = parseInt(port, 10);
    } else if (trimmedLine.startsWith('proto ')) {
      const [, proto] = trimmedLine.split(/\s+/);
      config.proto = proto;
    } else if (trimmedLine.startsWith('auth ')) {
      const [, auth] = trimmedLine.split(/\s+/);
      config.auth = auth;
    } else if (trimmedLine.startsWith('cipher ')) {
      const [, cipher] = trimmedLine.split(/\s+/);
      config.cipher = cipher;
    }
  });

  return config;
}