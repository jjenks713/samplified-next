import { useSession, signOut } from 'next-auth/client'
import NextLink from 'next/link'
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



const DropDown = () => {
const [session] = useSession()

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

    return (
        <button appearance="primary" fontSize="16px">
          {session ? 
          <>
            <a
            aria-current="page"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <img className='rounded-full' src={session.user.image} width={34}></img>
            </a>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem><NextLink href='/userpage'>Profile</NextLink></MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </> :
            <NextLink href="/sign-up"><button className='sign-button'>Sign Up/In</button></NextLink>
          }
        </button>
    )
}

export default DropDown