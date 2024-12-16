import express from 'express';
import cors from 'cors';
import { NodeSSH } from 'node-ssh';
import { config } from 'dotenv';
import { logger } from './utils/logger.js';
import { authMiddleware } from './middleware/auth.js';
import serverRoutes from './routes/servers.js';
import vpnRoutes from './routes/vpn.js';
import packageRoutes from './routes/packages.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/servers', serverRoutes);
app.use('/api/vpn', vpnRoutes);
app.use('/api/packages', packageRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});