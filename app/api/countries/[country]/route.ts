import { getCountry } from '@/utils/api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { country: string } }
) {
  const countryName = params.country;

  const country = await getCountry(countryName);

  return NextResponse.json({ country });
}
