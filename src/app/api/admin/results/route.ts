import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { roundId, scores } = body;

        // scores: [{ matchId, homeScore, awayScore }]

        if (!roundId || !scores) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

        await prisma.$transaction(async (tx) => {
            // 1. Update Match Scores
            for (const score of scores) {
                await tx.match.update({
                    where: { id: score.matchId },
                    data: {
                        homeScore: Number(score.homeScore),
                        awayScore: Number(score.awayScore),
                        status: 'FINISHED'
                    }
                });
            }

            // 2. Finalize Round
            await tx.round.update({
                where: { id: roundId },
                data: { status: 'FINALIZED' }
            });

            // 3. Calculate Results & Prizes
            // Simplified Logic: 
            // - Fetch all bets for this round
            // - For each bet, check predictions vs actual scores
            // - Calculate points (Exact = 3, Outcome = 1)
            // - Mock Prize: $100 * (Points / 10)

            const tickets = await tx.ticket.findMany({
                where: { roundId, status: 'PENDING' },
                include: { user: true }
            });

            // We need the matches with updated scores to compare
            const matches = await tx.match.findMany({ where: { roundId } });
            const matchMap = new Map(matches.map(m => [m.id, m]));

            for (const ticket of tickets) {
                let points = 0;
                const predictions = JSON.parse(ticket.predictions);
                // predictions is object { matchId: { home, away } } based on my last update to Betting Page

                for (const [matchId, pred] of Object.entries(predictions)) {
                    const match = matchMap.get(matchId);
                    if (!match || match.homeScore === null || match.awayScore === null) continue;

                    // Ensure we work with numbers
                    const p = {
                        home: Number((pred as any).home),
                        away: Number((pred as any).away)
                    };

                    const actualDiff = match.homeScore - match.awayScore;
                    const predDiff = p.home - p.away;

                    const actualOutcome = actualDiff > 0 ? 'HOME' : actualDiff < 0 ? 'AWAY' : 'DRAW';
                    const predOutcome = predDiff > 0 ? 'HOME' : predDiff < 0 ? 'AWAY' : 'DRAW';

                    if (match.homeScore === p.home && match.awayScore === p.away) {
                        points += 3; // Exact Score
                    } else if (actualOutcome === predOutcome) {
                        points += 1; // Correct Outcome
                    }
                }

                // Determine Prize (Simplistic rule: $10 per point)
                const prize = points * 10;

                if (prize > 0) {
                    await tx.user.update({
                        where: { id: ticket.userId },
                        data: { balance: { increment: prize } }
                    });

                    await tx.transaction.create({
                        data: {
                            userId: ticket.userId,
                            type: 'PRIZE_WIN',
                            amount: prize,
                            description: `Won prize for round ${roundId}. Points: ${points}`
                        }
                    });
                }

                await tx.ticket.update({
                    where: { id: ticket.id },
                    data: { status: prize > 0 ? 'WON' : 'LOST', payout: prize, score: points }
                });
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in scoring:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
