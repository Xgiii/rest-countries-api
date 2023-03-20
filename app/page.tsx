'use client';

import CountryCard from '@/components/CountryCard';
import { Countries } from '@/utils/interfaces';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import useSwr from 'swr';

const fetcher = async (url: string) =>
  await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });

const options = [
  { value: 'africa', label: 'Africa' },
  { value: 'america', label: 'America' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
];

export default function Home() {
  const { data, isLoading, error } = useSwr('/api/countries', fetcher);

  if (error)
    return (
      <p className='font-bold text-red-500 text-center mt-8 text-xl'>{error}</p>
    );

  return (
    <div className='px-6 md:px-24 mt-16'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center px-6 space-x-6 w-[35vw] rounded-md shadow-md h-14 bg-white dark:bg-slate-800'>
          <MagnifyingGlassIcon className='h-6 w-6' />
          <input
            type='text'
            placeholder='Search for a country...'
            className='bg-transparent outline-none'
          />
        </div>
        <div className='flex items-center justify-between space-x-12 px-4 h-14 bg-white text-slate-500 dark:text-slate-300 dark:bg-slate-800 shadow-md rounded-md'>
          <p>Filter by Region</p>
          <ChevronDownIcon className='w-6 h-6' />
        </div>
      </div>
      {isLoading ? (
        <p className='font-bold text-center mt-8 text-xl animate-pulse'>
          Loading...
        </p>
      ) : (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24 my-16'>
          {data.countries?.map((country: Countries) => (
            <CountryCard country={country} key={country.name.common} />
          ))}
        </section>
      )}
    </div>
  );
}
