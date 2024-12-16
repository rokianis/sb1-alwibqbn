import { Router } from 'express';
import { NodeSSH } from 'node-ssh';
import { logger } from '../utils/logger.js';
import { ping } from '../utils/ping.js';

const router = Router();

// Get server status
router.get('/:id/status', async (req, res) => {
  try {
    const { ip } = req.query;
    const status = await ping(ip);
    res.json(status);
  } catch (error) {
    logger.error('Error checking server status:', error);
    res.status(500).json({ error: 'Failed to check server status' });
  }
});

// Get server drives
router.get('/:id/drives', async (req, res) => {
  const ssh = new NodeSSH();
  try {
    const { ip, username, password } = req.query;
    
    await ssh.connect({
      host: ip,
      username,
      password,
    });

    const { stdout } = await ssh.execCommand('df -h');
    const drives = parseDriveInfo(stdout);
    res.json(drives);
  } catch (error) {
    logger.error('Error getting drive information:', error);
    res.status(500).json({ error: 'Failed to get drive information' });
  } finally {
    ssh.dispose();
  }
});

function parseDriveInfo(dfOutput) {
  const lines = dfOutput.split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [device, size, used, available, percentage, mountpoint] = line.split(/\s+/);
    return {
      device,
      size,
      used,
      available,
      mountPoint: mountpoint,
    };
  }).filter(drive => drive.device);
}

export default router;