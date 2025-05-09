import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger, type Logger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logger = createLogger();

export function log(msg: string) {
  logger.info(msg, { timestamp: true });
}

export async function setupVite(app: Express, server: Server) {
  const vite = await import("vite");
  const viteServer = await vite.createServer({
    server: {
      middlewareMode: true,
      hmr: { server }
    },
    root: path.resolve(__dirname, "..", "client"),
    appType: "spa"
  });

  app.use(viteServer.middlewares);
}

export function serveStatic(app: Express) {
  // В production среде (Render) путь будет /opt/render/project/src/server/dist/public
  // В локальной среде путь будет relative to __dirname
  const isProduction = process.env.NODE_ENV === 'production';
  const publicPath = isProduction
    ? path.join(process.cwd(), 'server', 'dist', 'public')
    : path.resolve(__dirname, '..', 'server', 'dist', 'public');

  log(`Serving static files from: ${publicPath}`);
  
  // Serve static files
  app.use(express.static(publicPath));
  
  // Fallback to index.html
  app.get("*", (req, res) => {
    const indexPath = path.join(publicPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      log(`index.html not found in ${publicPath}`);
      return res.status(404).send(`index.html not found. Looking in: ${indexPath}`);
    }
    res.sendFile(path.join(publicPath, "index.html"));
  });
}
