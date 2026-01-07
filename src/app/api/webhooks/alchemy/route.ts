import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Webhook received:', JSON.stringify(body, null, 2));

        // Handle Alchemy Notify payload
        // Docs: https://docs.alchemy.com/reference/notify-api-quickstart
        const activities = body.activity || [];

        for (const activity of activities) {
            // Check if it's an incoming transfer (toAddress matches one of our users is verified by finding the user)
            // Check if it's USDC
            // Note: Alchemy uses 'USDC' as asset symbol, verify rawContract address for safety

            const isUSDC = activity.rawContract?.address?.toLowerCase() === USDC_ADDRESS.toLowerCase() || activity.asset === 'USDC';

            if (isUSDC && activity.category === 'token') {
                const toAddress = activity.toAddress;
                const amount = activity.value; // Alchemy provides this as a number/string
                const hash = activity.hash;

                // Find user
                const user = await prisma.user.findUnique({
                    where: { walletAddress: toAddress },
                });

                if (user) {
                    // Check deduplication
                    const existingTx = await prisma.transaction.findFirst({
                        where: { txHash: hash, type: 'DEPOSIT' }
                    });

                    if (!existingTx) {
                        await prisma.$transaction([
                            prisma.user.update({
                                where: { id: user.id },
                                data: { balance: { increment: parseFloat(amount) } }
                            }),
                            prisma.transaction.create({
                                data: {
                                    userId: user.id,
                                    type: 'DEPOSIT',
                                    amount: parseFloat(amount),
                                    txHash: hash,
                                    description: 'Detected via Alchemy Webhook'
                                }
                            })
                        ]);
                        console.log(`Credited ${amount} USDC to ${toAddress}`);
                    } else {
                        console.log('Transaction already processed:', hash);
                    }
                } else {
                    console.log('User not found for address:', toAddress);
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
