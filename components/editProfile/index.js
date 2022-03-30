import { useState } from "react"
import { getSession, useSession } from 'next-auth/client'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function EditProfile( { sounds } ) {
    const [session, loading] = useSession()
    const [name, setName] = useState(session.user.name)
    const [info, setInfo] = useState()
    const [soundcloud, setSoundcloud] = useState()
    const [twitter, setTwitter] = useState()
    const [facebook, setFacebook] = useState()

    let id = sounds[0].createdBy
    console.log(id)

    const editForm = async (e) => {
        e.preventDefault()

        const editInfo = {
            id: id,
            name: name,
            info: info,
            soundcloud: soundcloud,
            twitter: twitter,
            facebook: facebook
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/editUser`, {
            method: 'POST',
            body: JSON.stringify({editInfo}),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        
        if (loading) {
            return null
        }
        //alert("Your sound was uploaded")
        //window.location.href = '/userpage'
    }

    return (
        <>
        <form onSubmit={editForm}>
            <div className="md:flex text-center mb-6">
                <div className="md:w-1/3">
                    <label htmlFor='name' className="block text-gray-500 text-right font-bold mb-1 md:mb-0 pr-4">
                        Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label htmlFor='info' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Info
                    </label>
                </div>
                <div className="md:w-2/3">
                    <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    placeholder="Info" 
                    onChange={(e) => setInfo(e.target.value)} />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label htmlFor='Soundcloud' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        SC
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    placeholder="Link" 
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
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    placeholder="Link" 
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
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    placeholder="Link" 
                    onChange={(e) => setFacebook(e.target.value)} />
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">

                <button className="shadow bg-purple-500 cursor-auto focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>

                </div>
            </div>
        </form>
        </>
    )
}