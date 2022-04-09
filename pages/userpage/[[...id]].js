import { useState } from 'react'
import UserTable from "../../components/usertTable"
import { getSession, useSession } from 'next-auth/client'
import Navigator from '../../components/navigator';
import { useRouter } from 'next/router'
import IdCard from '../../components/idCard'
import dbInfo from '../api/db/getSound';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditProfile from '../../components/editProfile';
import userInfo from '../api/db/getInfo';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const User = ({ sounds, info }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
  
    if (!session) {
      return (
        <div 
        style={
          {
              backgroundImage: `url(/main.png)`
          }
        }
        >
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
                <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-24 w-auto" src="/logo-large.svg" alt="Workflow" /></a></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white"><Link href="/sign-up">Please sign in to continue</Link></h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
            </div><br></br><br></br>
        </div>
        </div>
      )
      } else {

        let userInfo = []

        const infoMap = info.map((info) => {
          if (session.user.id == info.createdBy) {
            userInfo.push(info)
          }
        })
        return (
          <div
          style={
            {
                backgroundImage: `url(/main.png)`
            }
          }
          >
          <Navigator/>
          <div className='grid sm:grid-cols-8 sm:grid-rows-1 text-center justify-center bg-theme'>
            <div className='col-span-8 lg:col-span-2 bg-gray-200 px-4 py-8 sm:py-10 justify-center'>
              <IdCard info={userInfo}/>

              <div className='grid justify-center pt-24'>
                <button className='profile-button shadow-2xl' onClick={handleOpen}>Edit Profile</button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="bg-theme bg-opacity-10"
                >
                  <Box sx={style} className='grid bg-theme text-white'>
                    <div className='absolute top-4 right-10 mb-10'>
                      <a className="text-white cursor-pointer" onClick={handleClose}>X</a>
                    </div>
                    <div className='m-5'>
                      <EditProfile info={userInfo} />
                    </div>
                  </Box>
                </Modal>
              </div> 
            </div> 
            <div className='col-span-8 lg:col-span-6'>
              <UserTable sounds={sounds} />
            </div>
          </div>
          </div>
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
    const info = await userInfo()

    return {
        props: { sounds, info },
    }
}

export default User