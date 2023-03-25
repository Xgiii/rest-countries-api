'use client';

import { fetcher } from '@/utils/api';
import { Countries } from '@/utils/interfaces';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

function CountryPage({ params }: { params: { country: string } }) {
  const { data, isLoading, error } = useSWR(
    `/api/countries/${params.country}`,
    fetcher
  );

  const country: Countries = data?.country[0];

  if (error)
    return (
      <p className='font-bold text-red-500 text-center mt-8 text-xl'>{error}</p>
    );

  if (isLoading)
    return (
      <p className='font-bold text-center mt-8 text-xl animate-pulse'>
        Loading...
      </p>
    );

  console.log(Object.values(country.currencies)[0].name);

  return (
    <div className='px-6 md:px-24 mt-8 md:mt-16'>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-20'>
        <div className='relative w-full lg:w-[45vw] lg:min-w-[20rem] aspect-[4/3]'>
          <Image src={country.flags.svg} alt={params.country + 'flag'} fill />
        </div>
        <div className='flex flex-col space-y-12 lg:space-y-8 mt-10 '>
          <h2 className='font-bold text-3xl'>{country.name.common}</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 column gap-x-2 space-y-4 lg:space-y-1'>
            <p>
              Native name:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.name.nativeName.fra?.common || country.name.common}
              </span>
            </p>
            <p>
              Population:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.population.toLocaleString('en-US', {
                  useGrouping: true,
                })}
              </span>
            </p>
            <p>
              Region:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.region}
              </span>
            </p>
            <p>
              Sub Region:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.subregion}
              </span>
            </p>
            <p>
              Capital:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.capital}
              </span>
            </p>
            <p>
              Top Level Domain:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {country.tld}
              </span>
            </p>
            <p>
              Currencies:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {Object.values(country.currencies).map((curr, i) => {
                  if (i < Object.values(country.currencies).length - 1) {
                    return curr.name + ', ';
                  }
                  return curr.name;
                })}
              </span>
            </p>
            <p>
              Languages:{' '}
              <span className='dark:text-gray-400 text-gray-500'>
                {Object.values(country.languages).map((lng, i) => {
                  if (i < Object.values(country.languages).length - 1) {
                    return lng + ', ';
                  }
                  return lng;
                })}
              </span>
            </p>
          </div>
          <div className='flex flex-wrap items-center'>
            Border Countries:{' '}
            {country.borders.map((border) => (
              <div
                key={border}
                className='text-sm bg-white dark:bg-slate-800 font-bold text-gray-600 dark:text-gray-300 px-4 py-2 mr-2 my-2 first:ml-2'
              >
                {border}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
