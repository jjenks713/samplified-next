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
        <nav>
          <div className='flex flex-row h-20 relative'>
            <div className='w-1/2 pl-10 pt-6'>
            <NextLink href="/"><img src="/logo.svg" /></NextLink>
            </div>
            <div className='w-1/2 rectangle pl-24 pt-7 relative'>
              <img src='/corner.svg' className='absolute left-10 bottom-0' />
              <ul className='flex'>
                <li className='pr-10'>
                <NextLink href="/">
                  <a>Home</a>
                </NextLink>
                </li>
                <li>
                <NextLink href="/sounds">
                  <a>Sounds</a>
                </NextLink>
                </li>

              </ul>
            </div>
            <div className='absolute right-5 pt-4'>
              <DropDown />
            </div>
          </div>
        </nav>
        </>
    )
}