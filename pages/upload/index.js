import { FormGroup } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router'

const keys = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
const genres = ["edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
const instruments = ["fx","guitar","drums","percusion","vocals","bass","keys","string","synth"]


export default function Upload() {
    const router = useRouter();

    const [bpm, updateBpm] = useState("");
    const [key, updateKey] = useState("");
    const [genre, updateGenre] = useState("");
    const [name, updateName] = useState("");
    const [loop, updateLoop] = useState("")
    const [instrument, updateInstrument] = useState("")
    const [file, updateFile] = useState('')

    const [session, loading] = useSession()
    let user

    // if a user is logged it, never show them this page,
    // go straight to app

    if (session) {
        user = session.user
    }


    //do something

/*     const [newSoundIsShown, setIsShown] = useState(false)
    const [allSounds, setAllSounds] = useState(folders || []) */


    const submitForm = async () => {
        let dataObj = {
            soundName: name,
            bpm: bpm,
            key: key,
            genre: genre,
            loop: loop,
            instrument: instrument,
            file: file,
            user: user.id,
            userName: user.name
        }
        console.log(dataObj)
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sound`, {
            method: 'POST',
            body: JSON.stringify({dataObj}),
            headers: {
              'Content-Type': 'application/json'
              }
            }) 
      
            const { data } = await res.json()
            setAllSounds((state) => [...state, data])

            window.location.href = "/userpage"
      
        if (loading) {
          return null
        }
    }


    return (
        <>

        <Container maxWidth="md" className="grid justify-center pt-24">
        <div className="position absolute top-3 right-8 font-bold">
            <Link href="/userpage">X</Link>
        </div> 
            <div>
                <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Submit new Sound</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
            </div><br></br><br></br>
            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                         Sound Name*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Sound Name" onChange={(e) => updateName(e.target.value)} required/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        BPM*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="BPM" onChange={(e) => updateBpm(e.target.value)} required/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Key*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                        <select 
                        placeholder="Key"
                        value={key} 
                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        disabled={!keys.length}
                        onChange={(e) => updateKey(e.target.value)}
                        onBlur={(e) => updateKey(e.target.value)}
                        required
                        >
                
                        {
                            keys.map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))
                        }
                        
                        </select>    
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Genre*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                        <select 
                        value={genre} 
                        placeholder="Genre" 
                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        onChange={(e) => updateGenre(e.target.value)}
                        required
                        >
                            {
                                genres.map((genre) => (
                                    <option key={genre}>
                                        {genre}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Loop or One-Shot*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                        <select 
                        value={loop} 
                        placeholder="Loop or One-Shot" 
                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        onChange={(e) => updateLoop(e.target.value)}
                        required
                        >
                            <option>loop</option>
                            <option>one-shot</option>

                        </select>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Instrument*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                        <select 
                        value={instrument} 
                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        onChange={(e) => updateInstrument(e.target.value)}
                        required
                        >
                            {
                                instruments.map((instrument) => (
                                    <option key={instrument} value={instrument}>
                                        {instrument}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        File*
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input type="file" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="File" />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <button onClick={submitForm} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>

                    </div>
                </div>
                </form>
        </Container>
        </>
    )
}

/* export async function getServerSideProps(ctx) {
    const sound = Sound()

} */