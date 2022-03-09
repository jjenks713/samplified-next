import * as React from 'react';
import NextLink from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/client'
import DropDown from '../dropdown'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Navigator() {
  const [session] = useSession()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
    console.log("showing?")
  }  

    return (
        <>
        <nav className="bg-gray-800">
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
{/*                 <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>

                  <svg onClick={handleShow} className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>

                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> */}
                <NextLink href="/sounds"><a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Sounds</a></NextLink>

              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <NextLink href="/" ><a><img className="block lg:hidden h-8 w-auto hover:bg-opacity-30 hover:cursor-pointer" src="/s-logo.png" alt="Samplified" /></a></NextLink> 
                   
                  <NextLink href="/"><a><img className="hidden lg:block h-8 w-auto hover:bg-opacity-30 hover:cursor-pointer justify-left" src="/s-logo.png" alt="Samplified" /></a></NextLink>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 absolute right-0">
                    <NextLink href="/sounds"><a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Sounds</a></NextLink>
{/* 
                    <NextLink href="/sign-in"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a></NextLink>

                    <NextLink  href="/sign-up"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</a></NextLink> */}
                    <DropDown />
                  </div>
                </div>
                <div className="flex space-x-4 absolute right-0">
                  <a className="block justify-end lg:hidden h-8 w-auto hover:bg-opacity-30 hover:cursor-pointer" alt="Samplified"><DropDown /></a>
                </div>
              </div>

{/*               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <div className="ml-3 relative">
                  <div>
                    <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>


                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div
          id="mobile-menu"
          style={{ display: show ? "block" : "none" }}>
                              
            <div className="px-2 pt-2 pb-3 space-y-1">
              {session ? 
              <div className='text-white'>
                <ul>
                  <li>
                  <NextLink href="/sounds"><a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Sounds</a></NextLink>
                  </li>
                </ul>

              </div> :
                <div className='text-white'>
                <ul>
                  <li>
                  <NextLink href="/sounds"><a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Sounds</a></NextLink>                  </li><br></br>
                  <li>
                  <NextLink href="/sign-up"><a className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up/In</a></NextLink>
                  </li>
                </ul>

              </div>
             }
            </div>
          </div>
        </nav>
        </>
    )
}