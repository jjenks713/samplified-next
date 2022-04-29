import { useState } from "react"
import { getSession, useSession } from 'next-auth/client'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button';


export default function EditProfile( { info } ) {
    const [session, loading] = useSession()
    const [name, setName] = useState(session.user.name)
    const [about, setAbout] = useState(info[0].info)
    const [soundcloud, setSoundcloud] = useState(info[0].soundcloud)
    const [twitter, setTwitter] = useState(info[0].twitter)
    const [facebook, setFacebook] = useState(info[0].facebook)

    let id = session.user.id
    console.log(info[0].soundcloud)

    const editForm = async (e) => {
        //e.preventDefault()

        const editInfo = {
            id: id,
            info: about,
            soundcloud: soundcloud,
            twitter: twitter,
            facebook: facebook
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/db/editUser`, {
            method: 'POST',
            body: JSON.stringify({editInfo}),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        
        if (loading) {
            return null
        }
        alert("Updated Profile")
        window.location.href = '/userpage'
    }

    return (
        <div
        className="bg-theme"
        
        >
        {info.map(info => (
            <form 
            onSubmit={editForm}
            >
                <div className="md:flex text-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor='name' className="block text-gray-500 text-right font-bold mb-1 md:mb-0 pr-4">
                            {name}
                        </label>
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor='info' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Info
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea className="text-theme p-4 rounded-lg" 
                        value={about}
                        onChange={(e) => setAbout(e.target.value)} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor='Soundcloud' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            SC
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="text-theme p-4 rounded-lg" 
                        value={soundcloud} 
                        onChange={(e) => setSoundcloud(e.target.value)} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor='Twitter' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            <TwitterIcon />
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="text-theme p-4 rounded-lg" 
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor='Facebook' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            <FacebookIcon />
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="text-theme p-4 rounded-lg" 
                        value={facebook} 
                        onChange={(e) => setFacebook(e.target.value)} />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">

                    <Button className="profile-button">
                        Submit
                    </Button>

                    </div>
                </div>
            </form>
        ))}

        </div>
    )
}