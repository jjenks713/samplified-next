import Navigator from '../../components/navigator'
import Footer from '../../components/footer'
import dbInfo from '../api/db/getSound';
import Search from '../../components/search'


export default function AllSounds({ allSounds }) {

    return (
        <div className='bg-theme' 
        style={
            {
                backgroundImage: `url(/main.png)`
            }
        }
        >
        <Navigator />
            <div className='bg-theme'>
            <Search allSounds={allSounds}/>
            </div>
        </div>
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