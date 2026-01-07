import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { walletAddress } = body;

        if (!walletAddress) {
            return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
        }

        let user = await prisma.user.findUnique({
            where: { walletAddress },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { walletAddress },
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error creating/fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
        return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { walletAddress },
            include: { transactions: { orderBy: { createdAt: 'desc' }, take: 10 } }
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
