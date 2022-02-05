import '../styles/tailwind.css'
import Navigator from '../components/navigator'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navigator />
    <Component {...pageProps} />
    </>

  ) 
}

export default MyApp
