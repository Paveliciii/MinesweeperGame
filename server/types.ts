import { Request } from 'express';

export interface TelegramInitData {
  query_id?: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  auth_date?: number;
  hash?: string;
}

export interface GameScore {
  userId: number;
  username?: string;
  time: string;
  difficulty: string;
  won: boolean;
  date: Date;
}

export interface CustomRequest extends Request {
  telegramData?: TelegramInitData;
}