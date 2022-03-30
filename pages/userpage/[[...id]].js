import { useState } from 'react'
import UserTable from "../../components/usertTable"
import { getSession, useSession } from 'next-auth/client'
import Navigator from '../../components/navigator';
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'
import dbInfo from '../api/db';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditProfile from '../../components/editProfile';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const User = ({ sounds }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
    if (!session) {
      return (
        <>
        <Navigator />
        <div
          className='py-24'
          isShown
          title="Session expired"
          confirmLabel="Ok"
          hasCancel={false}
          hasClose={false}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEscapePress={false}
          onConfirm={() => router.push('/')}
        >
            <div>
                <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"><Link href="/sign-up">Please sign in to continue</Link></h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
            </div><br></br><br></br>
        </div>
        </>
      )
      } else {
        return (
          <>
          <Navigator/>
          <div className='grid sm:grid-cols-8 sm:grid-rows-1 justify-center'>
            <div className='col-span-8 lg:col-span-2 bg-gray-200 px-10 py-4 sm:py-10'>
              <IdCard />

              {/* <div className='grid justify-center'>
                <Button onClick={handleOpen}>Edit Profile</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className='grid'>
                    <div className='absolute top-2 right-0 mb-10'>
                      <Button className="text-black" onClick={handleClose}>X</Button>
                    </div>
                    <div className='m-5'>
                      <EditProfile sounds={sounds} />
                    </div>
                  </Box>
                </Modal>
              </div>  */}
            </div> 
            <div className='col-span-8 lg:col-span-6'>
              <UserTable sounds={sounds} />
            </div>
          </div>
          </>
      )
    }
}

User.defaultProps = {
  props: [],
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (!session || !session.user) {
        return { props: {} }
      }

    const props = { }
    const sounds = await dbInfo()

    return {
        props: { sounds },
    }
}

export default User