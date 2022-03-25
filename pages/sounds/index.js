import Navigator from '../../components/navigator'
import Footer from '../../components/footer'
import dbInfo from '../api/db';
import Search from '../../components/search'


export default function AllSounds({ allSounds }) {

    return (
        <>
        <Navigator />
        <Search allSounds={allSounds}/>
        </>
    )
}

AllSounds.defaultProps = {
    props: [],
  }
  
  export async function getServerSideProps(ctx) {
  
      const props = { }
      const allSounds = await dbInfo()
   
      return {
          props: { allSounds },
      }
  }