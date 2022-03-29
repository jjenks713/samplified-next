import Navigator from '../../components/navigator';
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'
import dbInfo from '../api/db';
import userInfo from '../api/users'
import AllTable from '../../components/allTable'


const publicuser = ({ publicSound, userData }) => {
    const { query } = useRouter()

    let sounds = []
    let publicUser = []

    const soundsMap = publicSound.map((sound) => {
      if (sound.createdBy === query.slug) {
        sounds.push(sound)
      }
    })

    const users = userData.map((user) => {
      if (user.name === sounds[0].userName) {
        publicUser.push(user)
      }
    })
  
        return (
          <>
          <Navigator/>
          <div className='grid sm:grid-cols-8 sm:grid-rows-1 justify-center'>
            <div className='col-span-8 lg:col-span-2 bg-gray-200 px-10 py-4 sm:py-10'>
              <IdCard publicUser={publicUser}/>     
            </div> 
            <div className='col-span-8 lg:col-span-6'>
              <AllTable slugSounds={sounds} />
            </div>
          </div>
          </>
      )
}

publicuser.defaultProps = {
  props: [],
}

export async function getServerSideProps(ctx) {

    const publicSound = await dbInfo()
    const userData = await userInfo()
    return {
        props: { publicSound, userData },
    }
}

export default publicuser