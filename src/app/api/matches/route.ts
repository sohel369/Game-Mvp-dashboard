import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const rounds = await prisma.round.findMany({
            where: { status: 'OPEN' },
            include: { matches: { orderBy: { startTime: 'asc' } } }
        });
        return NextResponse.json(rounds);
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
