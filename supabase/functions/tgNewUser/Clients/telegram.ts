import { Bot } from 'grammy';

const key = Deno.env.get('TELEGRAM_NAWAIA_NEW_USER') ?? '';
export const bot = new Bot(key);
