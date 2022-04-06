import Link from 'next/link'
import {signIn, useSession} from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';



export default function SignIn() {

    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (session) {
        router.push('/userpage')
      }
    }, [session, router])

    function signInFunction() {
        signIn('google')
        if (loading) {
            return <div className='grid justify-center pt-24'><LinearProgress /></div> 
        }
    }
    
    if (loading) {
        return (
            <>
            <div className='grid justify-center pt-24'><LinearProgress /></div>          
            </>
        )
    } else {
        return (
            <>
            <div className="position absolute top-3 right-8 font-bold">
            <Link href="/">X</Link>
            </div>   
            
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                    <div className='relative'>
                    <img 
                    src='/BG.svg' 
                    alt="background"
                    className='bg-sign'
                    ></img>

                    <div className='absolute top-1/2 transform -translate-y-1/2 left-3'>
                        <a className='hover:bg-opacity-30 hover:cursor-pointer'>
                        <img 
                        className="mx-auto h-12 w-auto main-bg" 
                        src="/main-login.png" 
                        alt="Workflow"
                        />
                        </a>
                    </div>
                    <div className='absolute top-1/2 transform -translate-y-1/2 left-7'>
                    <Link href="/">
                        <a className='hover:bg-opacity-30 hover:cursor-pointer'>
                        <img 
                        className="mx-auto h-12 w-auto lg-logo" 
                        src="/logo-large.svg" 
                        alt="Workflow" 
                        /></a>
                    </Link>
                    </div>

                    </div>

                </div>
                <div className='col-span-2'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up/Sign In</h2>

                <div className='grid justify-center'><Button type="google" onClick={() => signInFunction()}><img className='w-64' src="/google-1.png" alt="Sign in with Google"></img></Button></div>

                </div>
            </div>
            </>
        )
    }
}