import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Подключи призму здесь

export async function POST(req: Request) {
  const { buyerId, productId } = await req.json();

  // 1. Ищем товар и покупателя
  const product = await prisma.product.findUnique({ where: { id: productId } });
  const buyer = await prisma.user.findUnique({ where: { telegramId: buyerId } });

  if (!product || !buyer) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });

  // 2. Проверяем баланс
  if (buyer.balance < product.price) {
    return NextResponse.json({ error: 'Недостаточно средств' }, { status: 400 });
  }

  // 3. ТРАНЗАКЦИЯ: Снимаем деньги у покупателя и создаем заказ в HOLD
  const result = await prisma.$transaction([
    prisma.user.update({
      where: { telegramId: buyerId },
      data: { balance: { decrement: product.price } }
    }),
    prisma.order.create({
      data: {
        productId: product.id,
        buyerId: buyer.id,
        status: 'HOLD'
      }
    })
  ]);

  return NextResponse.json({ message: 'Деньги заморожены, ждем подтверждения', order: result[1] });
}

