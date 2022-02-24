import Link from 'next/link'
import {signIn, useSession} from 'next-auth/client'
import SocialButton from '../../components/socialButton'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Button from '@mui/material/Button';



export default function SignIn() {

    const [session, loading] = useSession()
    const router = useRouter()
    
   // if a user is logged it, never show them this page,
   // go straight to app
    useEffect(() => {
      if (session) {
        router.push('/user')
      }
    }, [session, router])

    return (
        <>

        <div className="position absolute top-3 right-8 font-bold">
        <Link href="/">X</Link>
        </div>   
        
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-lg shadow-sm -space-y-px">
                    <div className="py-2">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div className="py-2">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                    <div className="py-2">
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input id="first-name" name="first-name" type="first-name" autoComplete="current-first-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" />
                    </div>
                    <div className="py-2">
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input id="password" name="password" type="" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" />
                    </div>
                </div>


                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Sign Up
                    </button>
                </div>
                </form>
{/*                 <SocialButton type="github" onClick={() => signIn('github')} />
                <Button type="facebook" onClick={() => signIn('facebook')}>Continue with Facbook</Button> */}
                <div className='grid justify-center'><Button type="google" onClick={() => signIn('google')}><img className='w-64' src="/google.png" alt="Sign in with Google"></img></Button></div>


                <div className="text-sm text-center">
                    Already have an account? <Link href="/sign-in"><a className="font-medium text-indigo-600 hover:text-indigo-500">Sign In</a></Link>
                </div>
            </div>
            </div>
        </>

    )
}