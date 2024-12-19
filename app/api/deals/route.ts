import { NextResponse } from 'next/server';
import { getAllDeals, createDeal } from '@/lib/db/deals';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function GET() {
  try {
    await limiter.check(10);
    const deals = getAllDeals();
    return NextResponse.json(deals);
  } catch (error) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const deal = createDeal(body);
    return NextResponse.json(deal);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}