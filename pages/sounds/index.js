import Table from "../../components/table"
import Navigator from '../../components/navigator'
import Footer from '../../components/footer'
import dbInfo from '../api/db';
import { getSession, useSession } from 'next-auth/client'


export default function Sounds({ sounds }) {

    return (
        <>
        <Navigator />
        <Table sounds={sounds}/>
        <Footer />
        </>
    )
}

Sounds.defaultProps = {
    props: [],
  }
  
  export async function getServerSideProps(ctx) {
      const session = await getSession(ctx)
      //console.log(session)
  
      if (!session || !session.user) {
          return { props: {} }
        }
  
      const props = { }
      const sounds = await dbInfo()
      //const data = await accounts.json()
      //props.dbI
      console.log("serversideprops", {sounds})
  
  
      return {
          props: { sounds },
      }
  }