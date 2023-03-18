'use client'

import MainHeader from '@/components/MainHeader';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-slate-100 dark:bg-slate-900 dark:text-white'>
        <ThemeProvider attribute='class' enableSystem={false}>
          <MainHeader />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
