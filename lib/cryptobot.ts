import axios from 'axios';

const CRYPTO_BOT_TOKEN = process.env.CRYPTO_BOT_TOKEN; // Токен берем из @CryptoBot -> API
const API_URL = 'https://pay.crypt.bot/api';

const cryptoBot = axios.create({
  baseURL: API_URL,
  headers: { 'Crypto-Pay-API-Token': CRYPTO_BOT_TOKEN }
});

export const createInvoice = async (amount: number, userId: string) => {
  try {
    const response = await cryptoBot.post('/createInvoice', {
      asset: 'USDT',
      amount: amount.toString(),
      description: `Пополнение баланса для пользователя ${userId}`,
      payload: userId, // Передаем ID пользователя, чтобы потом понять, кому зачислить
    });
    return response.data.result;
  } catch (error) {
    console.error('Ошибка CryptoBot:', error);
    return null;
  }
};

// Метод для вывода средств (только для админа или проверенных заявок)
export const transferFunds = async (userId: string, amount: number, address: string) => {
  // Тут логика вывода через /transfer или вывод на адрес
  // ВНИМАНИЕ: Для этого нужен разрешенный доступ в настройках приложения КриптоБота
};

