import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Add this line

export async function POST(request: Request) {
  try {
    // Basic test response
    return NextResponse.json({ message: 'API is working' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
