import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import UserTable from "../../components/usertTable"
//import { session } from 'next-auth/client';
import { getSession, useSession } from 'next-auth/client'
//import { connectToDB } from '../../db/connect'
import Navigator from '../../components/navigator';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'
import dbInfo from '../api/db';
//import DbData from '../../components/data'


const User = ({ sounds }) => {
    const [session, loading] = useSession()
    const sessionArray = [session]
    const router = useRouter()
    console.log(sounds, session)
    //const [data] = accounts.map(account => ({...account}))
    //data.json()
  
    if (!loading && !session) {
        window.location.href = "/"
      } else {
        return (
          <>
          <Navigator/>
          <Container maxWidth="md" className="grid justify-center">
          <IdCard />
          </Container>
{/*           <div>
            {accounts.map((account) => (
              <div>Hello{account.name}</div>
            ))
            }
          </div> */}
          <UserTable sounds={sounds} />
          </>
      )
    }
}

User.defaultProps = {
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
    //console.log("serversideprops", {sounds})


    return {
        props: { sounds },
    }
}

export default User