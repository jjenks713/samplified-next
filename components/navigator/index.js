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
        <nav 
          className='relative'
          style={
            {
              fontFamily: `'Ubuntu', sans-serif;`
      
            }
          }
        >

          <div className='flex flex-row h-20 relative'>
            
            {/* mobile nav */}
            <div className='visible sm:invisible text-white'>

              <div className='flex justify-between w-full absolute top-1/2 bottom-0 transform -translate-y-1/2 px-4'>
                <div className='mt-2.5'>
                  <NextLink href="/sounds">
                    <a>Sounds</a>
                  </NextLink>
                </div>
                <div>
                <NextLink href="/"><img src="/logo.svg" /></NextLink>

                </div>
                <div>
                  <DropDown />
                </div>
              </div>
            </div>
            
            {/* Nav */}
            <div className='w-10 invisible sm:visible sm:w-1/2 pl-10 pt-6'>
              <NextLink href="/"><img className="cursor-pointer" src="/logo.svg" /></NextLink>
              </div>
              <div className='w-1/2 invisible sm:visible pl-24 relative rectangle shado-2xl text-white'>
                <div className='absolute top-1/2 bottom-0 transform -translate-y-1/2'>
                  <div className='flex relative'> 
                    <div className='pr-10 pt-1'>
                    <NextLink href="/">
                      <a>Home</a>
                    </NextLink>
                    </div>
                    <div className='pr-10 pt-1'>
                    <NextLink href="/sounds">
                      <a>Sounds</a>
                    </NextLink>
                    </div>
                  </div>

                </div>
                <div className='absolute top-1/2 transform -translate-y-1/2 right-5'>
                    <DropDown />
                </div>
                <div className='absolute invisible sm:visible left-12 xl:left-16 bottom-0'>
                  <img src='/corner.svg' />
                </div>
              </div>
          </div>

        </nav>
        </>
    )
}