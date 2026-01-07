import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { walletAddress, amount } = body;

        const withdrawAmount = parseFloat(amount);

        if (!walletAddress || isNaN(withdrawAmount) || withdrawAmount <= 0) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { walletAddress } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        if (user.balance < withdrawAmount) {
            return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
        }

        // Atomic deduction and request creation
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: user.id },
                data: { balance: { decrement: withdrawAmount } }
            });

            await tx.withdrawal.create({
                data: {
                    userId: user.id,
                    amount: withdrawAmount,
                    status: 'PENDING'
                }
            });

            // Also log transaction as debit
            await tx.transaction.create({
                data: {
                    userId: user.id,
                    type: 'WITHDRAWAL_REQUEST',
                    amount: -withdrawAmount,
                    description: 'Withdrawal Request pending approval'
                }
            });
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
