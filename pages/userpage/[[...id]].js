import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import UserTable from "../../components/usertTable"
import { getSession, useSession } from 'next-auth/client'
import Navigator from '../../components/navigator';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'
import dbInfo from '../api/db';
import Link from 'next/link'


const User = ({ sounds }) => {
    const [session, loading] = useSession()
    const router = useRouter()
  
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
          <div className='grid sm:grid-cols-8 sm:grid-rows-1 justify-center'>
            <div className='col-span-8 lg:col-span-2 bg-gray-200 px-10 py-4 sm:py-10'>
              <IdCard />     
            </div> 
            <div className='col-span-8 lg:col-span-6'>
              <UserTable sounds={sounds} />
            </div>
          </div>
          </>
      )
    }
}

User.defaultProps = {
  props: [],
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (!session || !session.user) {
        return { props: {} }
      }

    const props = { }
    const sounds = await dbInfo()

    return {
        props: { sounds },
    }
}

export default User