'use client';

import CountryCard from '@/components/CountryCard';
import { fetcher } from '@/utils/api';
import { Countries } from '@/utils/interfaces';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import useSwr from 'swr';

const options = [
  { value: 'africa', label: 'Africa' },
  { value: 'americas', label: 'Americas' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
];

export default function Home() {
  const { data, isLoading, error } = useSwr('/api/countries', fetcher);

  const [searchedCountry, setSearchedCountry] = useState('');
  const [countries, setCountries] = useState<Countries[]>();
  const [filterRegionDropdown, setFilterRegionDropdown] = useState(false);
  const [region, setRegion] = useState('');

  useEffect(() => {
    setCountries(data?.countries);
  }, [data]);

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchedValue = e.target.value.toLowerCase();
    setSearchedCountry(searchedValue);
    setRegion('');

    const filteredCountries = data?.countries.filter((country: Countries) =>
      country.name.common.toLowerCase().includes(searchedValue)
    );

    setCountries(filteredCountries);
  }

  function filterByRegionHandler(region: string) {
    setRegion(region);

    const filteredCountries = data?.countries.filter(
      (country: Countries) => country.region === region
    );
    setCountries(filteredCountries);

    setFilterRegionDropdown(true);
    // it sets dropdown to true and other handler set this to opposite value so in the end its false. Hacky :)
  }

  if (error)
    return (
      <p className='font-bold text-red-500 text-center mt-8 text-xl'>{error}</p>
    );

  return (
    <div className='px-6 md:px-24 mt-8 md:mt-16'>
      <div className='flex flex-col space-y-10 md:space-y-0 md:flex-row items-center justify-between'>
        <div className='flex items-center px-6 space-x-6 w-full md:w-[35vw] rounded-md shadow-md h-14 bg-white dark:bg-slate-800'>
          <MagnifyingGlassIcon className='h-6 w-6' />
          <input
            type='text'
            value={searchedCountry}
            onChange={searchHandler}
            placeholder='Search for a country...'
            className='bg-transparent outline-none w-full'
          />
        </div>
        <div
          onClick={() => setFilterRegionDropdown((prevState) => !prevState)}
          className='flex self-start md:self-auto items-center justify-between px-8 h-14 bg-white text-slate-500 dark:text-slate-300 dark:bg-slate-800 shadow-md rounded-md cursor-pointer relative'
        >
          <p className='mr-12'>Filter by Region</p>
          <ChevronDownIcon className='w-6 h-6' />
          {filterRegionDropdown && (
            <div className='absolute w-full px-8 py-4 space-y-2 bg-white dark:bg-slate-800 top-16 left-0 z-10 rounded-md'>
              {options.map((region) => (
                <p
                  onClick={() => filterByRegionHandler(region.label)}
                  key={region.value}
                >
                  {region.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <p className='font-bold text-center mt-8 text-xl animate-pulse'>
          Loading...
        </p>
      ) : (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24 my-12'>
          {countries?.map((country: Countries) => (
            <CountryCard country={country} key={country.name.common} />
          ))}
        </section>
      )}
    </div>
  );
}
