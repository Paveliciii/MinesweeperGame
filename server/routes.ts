import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { Router } from 'express';
import type { GameScore, CustomRequest } from './types';
import { createHash, createHmac } from 'crypto';

const router = Router();
const scores: GameScore[] = [];

// Функция валидации данных от Telegram
const validateTelegramData = (initData: string): boolean => {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secret = createHash('sha256')
      .update(process.env.BOT_TOKEN || '')
      .digest();

    const hmac = createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    return hmac === hash;
  } catch (e) {
    console.error('Validation error:', e);
    return false;
  }
};

// Маршрут для сохранения результатов игры
router.post('/api/score', (req: CustomRequest, res) => {
  const initData = req.headers['x-telegram-init-data'] as string;
  
  if (!initData || !validateTelegramData(initData)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { time, difficulty, won, event } = req.body;
    
    // Парсим данные пользователя из initData
    const urlParams = new URLSearchParams(initData);
    const userDataStr = urlParams.get('user') || '{}';
    const userData = JSON.parse(userDataStr);

    const score: GameScore = {
      userId: userData.id,
      username: userData.username,
      time,
      difficulty,
      won,
      date: new Date()
    };

    scores.push(score);
    console.log('Saved score:', score);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
