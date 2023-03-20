import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='h-full'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet" />
      </Head>      
      
      <body className='font-nunito-sans min-h-screen bg-very-light-gray dark:bg-very-dark-blue-1'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
