import { Request } from 'express';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramInitData {
  query_id?: string;
  user?: TelegramUser;
  auth_date: number;
  hash: string;
}

export interface GameResult {
  time: string;
  difficulty: string;
  mineCount: number;
  won: boolean;
}

export interface GameScore extends GameResult {
  userId?: number;
  username?: string;
  date: Date;
}

export interface CustomRequest extends Request {
  telegramData?: {
    user?: TelegramUser;
    auth_date?: number;
    hash?: string;
  };
}