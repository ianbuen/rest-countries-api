import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }) { 

  return (
      <>
        <Head>
          <title>REST Countries API</title>
          <meta name="description" content="Lookup different countries" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <header>
          <Navbar />
        </header>
        
        <main className="h-full">
          <Component {...pageProps} />
        </main> 
      </>
  )}
