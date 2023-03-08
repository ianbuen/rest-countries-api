import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet" />
      </Head>      
      <body>
        <Main className="bg-very-light-gray text-very-dark-blue-2 flex font-nunito-sans" />
        <NextScript />
      </body>
    </Html>
  )
}
