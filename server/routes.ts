import type { Express } from "express";
import { createServer, type Server } from "http";
import { Router } from 'express';
import type { GameScore, CustomRequest } from './types';

const router = Router();
const scores: GameScore[] = [];

// Маршрут для сохранения результатов игры
router.post('/api/score', (req: CustomRequest, res) => {
  const { time, difficulty, mineCount, won } = req.body;
  const user = req.telegramData?.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const score: GameScore = {
    userId: user.id,
    username: user.username,
    time,
    difficulty,
    mineCount,
    won,
    date: new Date()
  };

  scores.push(score);
  console.log('Saved score:', score);
  res.json({ success: true });
});

// Маршрут для получения таблицы лидеров
router.get('/api/leaderboard', (_req, res) => {
  const leaderboard = scores
    .filter(score => score.won)
    .sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
      const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
      return timeA - timeB;
    })
    .slice(0, 10);

  res.json(leaderboard);
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(router);
  return createServer(app);
}

export default router;
