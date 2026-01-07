import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { withdrawalId, txHash, action } = body; // action: 'APPROVE' | 'REJECT'

        if (!withdrawalId || !action) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const withdrawal = await prisma.withdrawal.findUnique({
            where: { id: withdrawalId },
            include: { user: true }
        });

        if (!withdrawal) return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 });
        if (withdrawal.status !== 'PENDING') return NextResponse.json({ error: 'Request already processed' }, { status: 400 });

        if (action === 'APPROVE') {
            if (!txHash) return NextResponse.json({ error: 'TxHash required for approval' }, { status: 400 });

            await prisma.withdrawal.update({
                where: { id: withdrawalId },
                data: { status: 'COMPLETED', txHash }
            });

            // Update the transaction record to show completed? Not strictly necessary if we rely on Withdrawal table for status.
            // But let's verify if we need to update the Ledger? 
            // The ledger already showed deduction.

        } else if (action === 'REJECT') {
            // Refund
            await prisma.$transaction([
                prisma.user.update({
                    where: { id: withdrawal.userId },
                    data: { balance: { increment: withdrawal.amount } }
                }),
                prisma.withdrawal.update({
                    where: { id: withdrawalId },
                    data: { status: 'REJECTED' }
                }),
                prisma.transaction.create({
                    data: {
                        userId: withdrawal.userId,
                        type: 'WITHDRAWAL_REFUND',
                        amount: withdrawal.amount,
                        description: 'Withdrawal request rejected and refunded'
                    }
                })
            ]);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
