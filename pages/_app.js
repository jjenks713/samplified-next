import '../styles/tailwind.css'
import 'reflect-metadata'
import React from 'react'
import { Provider } from 'next-auth/client'


function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <Component {...pageProps} />
    </Provider>

  ) 
}

export default MyApp
