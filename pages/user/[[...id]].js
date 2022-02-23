import Container from '@mui/material/Container';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Table from "../../components/table"
//import { session } from 'next-auth/client';
import { getSession, useSession } from 'next-auth/client'
//import { connectToDB } from '../../db/connect'
import Navigator from '../../components/navigator';
import NextLink from 'next/link'
import { useRouter } from 'next/router'


const User = () => {
    const [session, loading] = useSession()
    const sessionArray = [session]
    const name = sessionArray[0]
    console.log(name)
    const router = useRouter()


    if (!loading && !session) {
        return (
          <div
            isShown
            title="Session expired"
            confirmLabel="Ok"
            hasCancel={false}
            hasClose={false}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onConfirm={() => router.push('/')}
          > 
            <Navigator />
            <NextLink href="/sign-up"><Button>Sign in to continue</Button></NextLink>
          </div>
        )
      }

    return (
        <>
        <Navigator/>
        <Container maxWidth="md" className="grid justify-center">
        <div className="max-w-sm w-full lg:max-w-full lg:flex py-10">
            <div 
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
            style={{
                backgroundImage: "url('https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg')"
            }}
            title="Woman holding a mug">
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">{/* {name.user.name} */}</div>
                <p className="text-gray-700 text-base">quick description</p>
                </div>
                <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="Avatar"></img>
                <div className="text-sm">
                    <Link href="/upload"><Button variant='contained' className='bg-gray'>Upload Sounds</Button></Link>
                </div>
                </div>
            </div>
        </div>
        </Container>
        <Table />
        </>
    )
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