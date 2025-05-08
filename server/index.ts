import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash, createHmac } from 'crypto';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware для проверки данных от Telegram
const validateTelegramWebAppData = (req: Request, res: Response, next: NextFunction) => {
  const initData = req.headers['x-telegram-init-data'];
  
  if (!initData) {
    console.log('No initData provided');
    return next();
  }

  if (!process.env.BOT_TOKEN) {
    console.error('BOT_TOKEN is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const urlParams = new URLSearchParams(initData.toString());
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secret = createHash('sha256')
      .update(process.env.BOT_TOKEN)
      .digest();

    const hmac = createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    if (hmac === hash) {
      console.log('Telegram data validation successful');
      req.telegramData = Object.fromEntries(urlParams.entries());
      next();
    } else {
      console.error('Hash validation failed');
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (e) {
    console.error('Validation error:', e);
    res.status(401).json({ error: 'Invalid data' });
  }
};

// Используем middleware для всех API маршрутов
app.use('/api', validateTelegramWebAppData);

// Отдаем статические файлы из папки dist/public
app.use(express.static(path.join(__dirname, '../dist/public')));

// Все остальные запросы переправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();

// Маршрут для сохранения результатов (можно добавить позже)
app.post('/api/score', express.json(), (req, res) => {
  const { score, time, won } = req.body;
  // Здесь можно добавить сохранение результатов
  console.log('Received score:', { score, time, won });
  res.json({ success: true });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});
