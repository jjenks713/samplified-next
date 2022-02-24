import Link from 'next/link'
import Button from '@mui/material/Button';
import { useSession, signOut } from 'next-auth/client'
import router from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';




const IdCard = () => {
    const [session] = useSession()
/*     const sessionArray = session.map((data) => {
        console.log(data)
    }) */
    console.log(session)
        return (
        <div>
            {session ?
            <div className="max-w-sm w-full lg:max-w-full lg:flex py-10">
                <div 
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                >
                <img src={session.user.image} alt="Profile Photo" width={200}></img>
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{session.user.name}</div>
                    <p className="text-gray-700 text-base">{session.user.email}</p>
                    </div>
                    <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={session.user.image} alt="Avatar"></img>
                    <div className="text-sm">
                        <Link href="/upload"><Button variant='contained' className='bg-gray'>Upload Sounds</Button></Link>
                    </div>
                    </div>
                </div>
            </div> :
            <div className="max-w-sm w-full lg:max-w-full lg:flex py-10">
                <div 
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                >
                <CircularProgress />
                </div>
            </div>
            }

        </div>
        )
}
export default IdCard

