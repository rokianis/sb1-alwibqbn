import { Router } from 'express';
import { OpenVPNManager } from 'openvpn-manager';
import { logger } from '../utils/logger.js';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
let vpnManager = null;

router.post('/connect', async (req, res) => {
  try {
    const { config, credentials } = req.body;
    
    // Save config file
    const configPath = path.join(process.cwd(), 'vpn', `${config.name}.ovpn`);
    await fs.writeFile(configPath, config.ovpnContent);

    // Initialize VPN manager
    vpnManager = new OpenVPNManager({
      configPath,
      auth: credentials,
    });

    // Connect to VPN
    await vpnManager.connect();
    
    const status = await vpnManager.getStatus();
    res.json(status);
  } catch (error) {
    logger.error('VPN connection error:', error);
    res.status(500).json({ error: 'Failed to connect to VPN' });
  }
});

router.post('/disconnect', async (req, res) => {
  try {
    if (vpnManager) {
      await vpnManager.disconnect();
      res.json({ message: 'VPN disconnected' });
    } else {
      res.status(400).json({ error: 'No active VPN connection' });
    }
  } catch (error) {
    logger.error('VPN disconnection error:', error);
    res.status(500).json({ error: 'Failed to disconnect VPN' });
  }
});

router.get('/status', async (req, res) => {
  try {
    if (vpnManager) {
      const status = await vpnManager.getStatus();
      res.json(status);
    } else {
      res.json({ connected: false });
    }
  } catch (error) {
    logger.error('Error getting VPN status:', error);
    res.status(500).json({ error: 'Failed to get VPN status' });
  }
});

export default router;