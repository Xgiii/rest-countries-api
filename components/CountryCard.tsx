'use client'

import { Countries } from '@/utils/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function CountryCard({ country }: { country: Countries }) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/${country.name.common}`)} className='flex flex-col shadow-md cursor-pointer'>
      <div className='relative w-full aspect-video rounded-t-md overflow-hidden'>
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          fill
          className='object-cover'
        />
      </div>
      <div className='bg-white dark:bg-slate-800 flex flex-col p-6 rounded-b-md'>
        <h2 className='font-bold text-xl my-4 truncate'>{country.name.common}</h2>
        <p>
          Population:{' '}
          <span className='text-gray-700 dark:text-gray-300'>{country.population}</span>
        </p>
        <p>
          Region: <span className='text-gray-700 dark:text-gray-300'>{country.region}</span>
        </p>
        <p>
          Capital: <span className='text-gray-700 dark:text-gray-300'>{country.capital}</span>
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
