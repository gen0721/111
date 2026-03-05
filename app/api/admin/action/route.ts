import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  const { orderId, action, adminId } = await req.json();

  // Проверка, что это ТЫ (anva4ik)
  if (adminId !== process.env.ADMIN_ID) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
  }

  if (action === 'REFUND') {
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { buyer: true, product: true } });
    if (!order) return NextResponse.json({ error: 'Order not found' });

    // Возвращаем деньги покупателю
    await prisma.$transaction([
      prisma.user.update({
        where: { id: order.buyerId },
        data: { balance: { increment: order.product.price } }
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: 'REFUNDED' }
      })
    ]);
    return NextResponse.json({ message: 'Деньги возвращены покупателю' });
  }

  return NextResponse.json({ message: 'Action completed' });
}

