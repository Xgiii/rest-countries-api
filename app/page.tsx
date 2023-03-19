'use client';

import CountryCard from '@/components/CountryCard';
import { Countries } from '@/utils/interfaces';
import axios from 'axios';
import useSwr from 'swr'
import { useEffect, useState } from 'react';

const fetcher = async (url: string) =>
  await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });

export default function Home() {
  const { data, isLoading, error } = useSwr('/api/countries', fetcher)


  if (isLoading)
    return (
      <p className='font-bold text-center mt-8 text-xl animate-pulse'>
        Loading...
      </p>
    );
  if (error)
    return (
      <p className='font-bold text-red-500 text-center mt-8 text-xl'>{error}</p>
    );

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 md:px-24 gap-24 my-24'>
      {data.countries?.map((country: Countries) => (
        <CountryCard country={country} key={country.name.common} />
      ))}
    </section>
  );
}
