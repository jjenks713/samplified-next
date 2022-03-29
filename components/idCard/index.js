import Link from 'next/link'
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/client'
import CircularProgress from '@mui/material/CircularProgress';




const IdCard = ({ publicUser }) => {
    const [session] = useSession()

    if (publicUser) {
    const userInfo = publicUser[0]
    return (
        <div>
            <div className="w-full lg:max-w-full lg:flex py-10 text-center">
    
                <div className="border p-10 border-gray-800 bg-white rounded-b flex flex-col justify-between text-center leading-normal">
                    <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{userInfo.name}</div>
                            <p className="text-gray-700 text-base">{userInfo.email}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={userInfo.image} alt="Avatar"></img>
                    </div>

                </div>
            </div>
        </div>
        )
    } else {
        return (
        <div>
            {session ?
            <div className="w-full lg:max-w-full lg:flex py-10 text-center">
    
                <div className="border p-10 border-gray-800 bg-white rounded-b flex flex-col justify-between text-center leading-normal">
                    <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{session.user.name}</div>
                    <p className="text-gray-700 text-base">{session.user.email}</p>
                    </div>
                    <div className="flex items-center justify-center">
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

}
export default IdCard

