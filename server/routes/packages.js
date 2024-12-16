import { Router } from 'express';
import { NodeSSH } from 'node-ssh';
import { logger } from '../utils/logger.js';

const router = Router();

const REQUIRED_PACKAGES = [
  'erlang',
  'libssl-dev',
  'libgmp-dev',
  'libsqlite3-dev',
  'make',
  'cmake',
  'gcc',
  'g++',
  'cockpit',
  'nfs-common',
];

router.post('/install', async (req, res) => {
  const ssh = new NodeSSH();
  try {
    const { ip, username, password } = req.body;
    
    await ssh.connect({
      host: ip,
      username,
      password,
    });

    // Update package list
    await ssh.execCommand('sudo apt update');

    // Install packages
    const { stdout, stderr } = await ssh.execCommand(
      `sudo DEBIAN_FRONTEND=noninteractive apt install -y ${REQUIRED_PACKAGES.join(' ')}`
    );

    logger.info('Package installation completed:', stdout);
    
    if (stderr) {
      logger.warn('Installation warnings:', stderr);
    }

    res.json({ message: 'Packages installed successfully' });
  } catch (error) {
    logger.error('Error installing packages:', error);
    res.status(500).json({ error: 'Failed to install packages' });
  } finally {
    ssh.dispose();
  }
});

export default router;