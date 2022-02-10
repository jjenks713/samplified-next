import '../styles/tailwind.css'
import Navigator from '../components/navigator'
import Footer from '../components/footer'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navigator />
    <Component {...pageProps} />
    <Footer></Footer>
    </>

  ) 
}

export default MyApp
