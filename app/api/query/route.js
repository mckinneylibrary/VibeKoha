import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { sql } = await request.json();
    
    // Simple safety check: Only allow SELECT statements
    if (!sql.toLowerCase().trim().startsWith('select')) {
      return NextResponse.json({ error: "Only SELECT queries are allowed." }, { status: 403 });
    }

    const data = await executeQuery(sql);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
