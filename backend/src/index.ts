import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Infinity Grid Duel API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      startGame: 'POST /game/start',
      getGameState: 'GET /game/state/:id',
      makeMove: 'POST /game/move',
      aiMove: 'POST /ai/move'
    },
    documentation: 'https://github.com/Manisha-Manhas/infinity-grid-duel'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Infinity Grid Duel API is running' });
});

// Game routes
app.use('/', gameRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred',
    statusCode: 500
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
