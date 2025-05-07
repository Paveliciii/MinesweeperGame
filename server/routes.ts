import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { Router } from 'express';
import type { GameScore, CustomRequest } from './types';

const router = Router();

// Временное хранилище результатов (в реальном приложении использовали бы базу данных)
const scores: GameScore[] = [];

// Маршрут для сохранения результатов игры
router.post('/api/score', (req: CustomRequest, res) => {
  const { time, difficulty, won } = req.body;
  const user = req.telegramData?.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const score: GameScore = {
    userId: user.id,
    username: user.username,
    time,
    difficulty,
    won,
    date: new Date()
  };

  scores.push(score);
  
  // В реальном приложении здесь был бы код сохранения в базу данных
  console.log('Saved score:', score);

  res.json({ success: true });
});

// Маршрут для получения таблицы лидеров
router.get('/api/leaderboard', (_req, res) => {
  // Сортируем по времени (для выигранных игр)
  const leaderboard = scores
    .filter(score => score.won)
    .sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
      const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
      return timeA - timeB;
    })
    .slice(0, 10); // Только топ-10

  res.json(leaderboard);
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.use(router);

  const httpServer = createServer(app);

  return httpServer;
}

export default router;
