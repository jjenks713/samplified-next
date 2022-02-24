import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from "../../components/table"
//import { session } from 'next-auth/client';
import { getSession, useSession } from 'next-auth/client'
//import { connectToDB } from '../../db/connect'
import Navigator from '../../components/navigator';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'


const User = () => {
    const [session, loading] = useSession()
    const sessionArray = [session]
    const name = sessionArray[0]
    const router = useRouter()


    if (!loading && !session) {
        window.location.href = "/"
      } else {
        return (
          <>
          <Navigator/>
          <Container maxWidth="md" className="grid justify-center">
          <IdCard />
          </Container>
          <Table />
          </>
      )
    }
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session)
    

    if (!session || !session.user) {
        return { props: {} }
      }

    const props = { }

    return {
        props,
      }

}

export default User