import Link from 'next/link'
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/client'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


const IdCard = ({ publicUser, info }) => {
    const [session] = useSession()
    let pubInfo = []

    if (publicUser) {
    const userInfo = publicUser[0]

    const iMap = info.map((info) => {
        if (info.createdBy === publicUser[1]) {
            pubInfo.push(info)
        }
    })

    return (
        <div
        style={
            {
              fontFamily: `'Ubuntu', sans-serif;`
      
            }
        }
        >
            <div className="w-full lg:max-w-full lg:flex py-10 text-center">
    
                <div className="border w-full p-10 border-gray-800 bg-white rounded-b flex flex-col justify-between text-center leading-normal">
                    <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{userInfo.name}</div>
                            <p className="text-gray-700 text-base">{userInfo.email}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <img className="rounded-full mr-4" src={userInfo.image} alt="Avatar"></img>
                    </div>
                    {pubInfo.map(info => (
                    <div className='py-4'>
                        <p className='py-4'>{info.info}</p>
                        <ul className='flex justify-evenly'>
                            {info.facebook === "" ? null : <li><a href={info.facebook} target="_blank"><FacebookIcon /></a></li>}                           
                            
                            {info.twitter === "" ? null : <li><a href={info.twitter} target="_blank"><TwitterIcon /></a></li> }

                            {info.soundcloud === "" ? null : <li><a href={info.soundcloud} target="_blank">SC</a></li> }
                        </ul>
                    </div>
                    ))}

                </div>
            </div>
        </div>
        )
    } else {
        let specInfo = []
        const infoMap = info.map((info) => {
            if (info.createdBy === session.user.id) {
                specInfo.push(info)
            }
        })
        return (
        <div>
            {session ?
            <div className="w-full lg:max-w-full lg:flex py-10 text-center">
    
                <div className="border rounded-md w-full p-4 border-gray-800 bg-white rounded-b flex flex-col justify-between text-center leading-normal">
                    <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{session.user.name}</div>
                    <p className="text-gray-700 text-base">{session.user.email}</p>
                    {specInfo.map(info => (
                    <div className='py-4'>
                        <p className='py-4'>{info.info}</p>
                        <ul className='text-sm'>
                            {info.facebook === "" ? null : <li><a href={info.facebook} target="_blank">{info.facebook}</a></li>}                           
                            
                            {info.twitter === "" ? null : <li><a href={info.twitter} target="_blank">{info.twitter}</a></li> }
 
                            {info.soundcloud === "" ? null : <li><a href={info.soundcloud} target="_blank">{info.soundcloud}</a></li> }
                        </ul>
                    </div>
                    ))}
                </div>
                    <div className="flex items-center justify-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={session.user.image} alt="Avatar"></img>
                        <div className="text-sm">
                            <Link href="/upload"><button variant='contained' className='profile-button text-theme shadow-2xl'>Upload Sounds</button></Link>
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

