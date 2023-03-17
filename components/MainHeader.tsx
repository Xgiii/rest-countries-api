'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon } from '@heroicons/react/24/outline';
import { MoonIcon as SolidMoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';

function MainHeader() {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='flex justify-between items-center bg-white dark:bg-slate-700 shadow-md py-6 px-6 md:px-24'>
      <h1 className='text-2xl font-bold'>Where in the world?</h1>
      {theme === 'light' && mounted && (
        <div
          onClick={() => setTheme('dark')}
          className='flex items-center space-x-4 cursor-pointer'
        >
          <MoonIcon className='w-6 h-6' />
          <p className='font-semibold'>Dark Mode</p>
        </div>
      )}
      {theme === 'dark' && mounted && (
        <div
          onClick={() => setTheme('light')}
          className='flex items-center space-x-4 cursor-pointer'
        >
          <SolidMoonIcon className='w-6 h-6 text-white' />
          <p className='font-semibold'>Light Mode</p>
        </div>
      )}
      {!mounted && (
        <div
          className='flex items-center space-x-4 cursor-pointer'
        >
          <SolidMoonIcon className='w-6 h-6 text-white' />
          <p className='font-semibold'>Light Mode</p>
        </div>
      )}
    </header>
  );
}

export default MainHeader;