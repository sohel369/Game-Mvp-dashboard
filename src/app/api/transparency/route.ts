import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const bets = await prisma.bet.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        const withdrawals = await prisma.withdrawal.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        // Serialize BigInts if any (Prisma sometimes has issues, but we use Float/Int here)
        return NextResponse.json({ bets, withdrawals });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
