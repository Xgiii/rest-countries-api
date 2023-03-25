import { getCountries } from '@/utils/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const countries = await getCountries();

  return NextResponse.json({ countries });
}
