import AllTable from "../../components/allTable"
import Navigator from '../../components/navigator'
import Footer from '../../components/footer'
import dbInfo from '../api/db';
//import userInfo from '../api/users'
import { getSession, useSession } from 'next-auth/client'


export default function AllSounds({ allSounds }) {

    return (
        <>
        <Navigator />
        <AllTable allSounds={allSounds}/>
        <Footer />
        </>
    )
}

AllSounds.defaultProps = {
    props: [],
  }
  
  export async function getServerSideProps(ctx) {
  
      const props = { }
      const allSounds = await dbInfo()
      //const allUsers = await userInfo()
      //const data = await accounts.json()
      //props.dbI
      console.log("serversideprops", {allSounds})
  
  
      return {
          props: { allSounds },
      }
  }