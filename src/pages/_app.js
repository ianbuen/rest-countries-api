import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) { 

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
    }
  }, [])
  

  return (
      <>
        <Head>
          <title>REST Countries API</title>
          <meta name="description" content="Lookup different countries" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <header>
          <Navbar theme={[darkMode, setDarkMode]} />
        </header>
        
        <main className={`h-full dark:text-white`}>
          <Component {...pageProps} />
        </main> 
      </>
  )}
