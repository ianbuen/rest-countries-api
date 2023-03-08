import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {

  return (
      <>
        <Head>
          <title>REST Countries API</title>
          <meta name="description" content="Lookup different countries" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Navbar />
        
        <main className="px-4 py-8">
          <Component {...pageProps} />
        </main>
      </>
  )}
