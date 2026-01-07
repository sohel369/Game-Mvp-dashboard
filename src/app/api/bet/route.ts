import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { walletAddress, cartItems } = body;

        if (!walletAddress || !cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { walletAddress },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.amount, 0);

        if (user.balance < totalAmount) {
            return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
        }

        // Process Transaction using detailed Prisma Transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // Deduct balance
            await tx.user.update({
                where: { id: user.id },
                data: { balance: { decrement: totalAmount } }
            });

            // Create Transaction Record
            await tx.transaction.create({
                data: {
                    userId: user.id,
                    type: 'BET_PLACED',
                    amount: -totalAmount,
                    description: `Placed ${cartItems.length} bets`
                }
            });

            // Create Bets
            for (const item of cartItems) {
                // Check if round exists, if not use a default or handle error
                // For MVP, if roundId is missing, we might skip or fail. 
                // We assume frontend sends valid data.
                // If matchId is sent, we should look up the match to get the roundId if not sent safely.

                // For this implementation, allow item.roundId

                await tx.bet.create({
                    data: {
                        userId: user.id,
                        roundId: item.roundId, // This must be valid UUID from existing Round
                        totalAmount: item.amount,
                        quantity: item.quantity || 1,
                        predictions: JSON.stringify(item.predictions)
                    }
                });
            }
        });

        return NextResponse.json({ success: true, newBalance: user.balance - totalAmount });

    } catch (error) {
        console.error('Bet placement error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
