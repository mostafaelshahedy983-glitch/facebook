import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'facebook-backend' });
});

export default app;