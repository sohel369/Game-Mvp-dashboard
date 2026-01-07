import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
    try {
        console.log("Seeding database...");
        const round = await prisma.round.create({
            data: {
                name: "Premier League Week 1",
                status: "OPEN",
                startDate: new Date(),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                matches: {
                    create: [
                        { homeTeam: "Arsenal", awayTeam: "Liverpool", startTime: new Date(Date.now() + 86400000), status: "SCHEDULED" },
                        { homeTeam: "Man Utd", awayTeam: "Chelsea", startTime: new Date(Date.now() + 172800000), status: "SCHEDULED" },
                        { homeTeam: "Barcelona", awayTeam: "Real Madrid", startTime: new Date(Date.now() + 259200000), status: "SCHEDULED" },
                    ]
                }
            }
        });
        return NextResponse.json(round);
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
