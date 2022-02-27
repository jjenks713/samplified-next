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
import Link from 'next/link'
//import DbData from '../../components/data'


const User = ({ sounds }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    //const [data] = accounts.map(account => ({...account}))
    //data.json()
  
    if (!session) {
      return (
        <>
        <Navigator />
        <div
          className='py-24'
          isShown
          title="Session expired"
          confirmLabel="Ok"
          hasCancel={false}
          hasClose={false}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEscapePress={false}
          onConfirm={() => router.push('/')}
        >
            <div>
                <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"><Link href="/sign-up">Please sign in to continue</Link></h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
            </div><br></br><br></br>
        </div>
        </>
      )
      } else {
        return (
          <>
          <Navigator/>
          <Container maxWidth="md" className="grid justify-center">
          <IdCard />
          </Container>
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