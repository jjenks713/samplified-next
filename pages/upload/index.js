import Container from '@mui/material/Container';
import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client';
import AWS from 'aws-sdk'
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const keys = ["", "A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
const genres = ["", "edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
const instruments = ["", "fx","guitar","drums","percussion","vocals","bass","keys","string","synth"]

export default function Upload({ S3_BUCKET, AWSAccessKeyId, AWSSecretKey }) {
    const [session, loading] = useSession()

    const [bpm, updateBpm] = useState("");
    const [key, updateKey] = useState("");
    const [genre, updateGenre] = useState("");
    const [name, updateName] = useState("");
    const [loop, updateLoop] = useState("")
    const [instrument, updateInstrument] = useState("")
    const [progress , setProgress] = useState(false);
    const [url, setUrl] = useState(``)
    const [terms, setTerms] = useState(false)

    let user
    if (session) {
        user = session.user
    }

    const updateTerms = () => {
        setTerms(!terms)
    }

    const uploadFile = (file) => {
        if (file.type == "audio/mpeg") {
            awsUpload(file)
        } else if (file.type == "audio/wav") {
            awsUpload(file)
        } else {
            alert("Upload must be mp3 or wav")
        }
    }

    const awsUpload = (file) => {
        const REGION ='us-east-1';
        const fileName = file.name.replace(/ /g, '')

        setUrl(`https://${S3_BUCKET}.s3.us-west-2.amazonaws.com/${fileName}`)

        AWS.config.update({
            accessKeyId: AWSAccessKeyId,
            secretAccessKey: AWSSecretKey
          })
     
        const myBucket = new AWS.S3({
            params: { Bucket: S3_BUCKET},
            region: REGION,
            url: `https://${S3_BUCKET}.s3.us-west-2.amazonaws.com/${fileName}`
        })
      
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: fileName,
            ContentType: file.type,
        };
     
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(true)
            })  
            .send((err) => {
                if (err) {
                console.log(err)
                } else {
                setProgress(false)
                console.log("successfully uploaded")
                }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault()

        let dataObj = {
            soundName: name,
            bpm: bpm,
            key: key,
            genre: genre,
            loop: loop,
            instrument: instrument,
            user: user.id,
            userName: user.name,
            url: url
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/db/upSound`, {
        method: 'POST',
        body: JSON.stringify({dataObj}),
        headers: {
            'Content-Type': 'application/json'
            }
        }) 
      
        if (loading) {
          return null
        }
        alert("Your sound was uploaded")
        window.location.href = '/userpage'
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
                            <label htmlFor='sound' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Sound Name*
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Sound Name" onChange={(e) => updateName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor="bpm" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                BPM*
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="BPM" onChange={(e) => updateBpm(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor='key' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Key*
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select 
                            placeholder="Key"
                            className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            disabled={!keys.length}
                            onChange={(e) => updateKey(e.target.value)}
                            onBlur={(e) => updateKey(e.target.value)}
                            required
                            >               
                            {
                                keys.map((key) => (
                                    <option key={key}>
                                        {key}
                                    </option>
                                ))
                            }                       
                            </select>    
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor='genre' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
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
                            <label htmlFor='loop' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
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
                            <option></option>
                            <option>loop</option>
                            <option>one-shot</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor='instrument' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
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
                            <label htmlFor='file' className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                File*
                            </label>
                        </div>
                        <div className="md:w-2/3">
                        <input 
                        type="file" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        placeholder="File" 
                        onChange={(e) => uploadFile(e.target.files[0])}
                        />
                        <div>{progress ? <LinearProgress /> : null }</div>
                        </div>
                    </div>

                    <div className='text-center pb-2'>
                    <Checkbox {...label} color="default"
                    checked={terms}
                    onChange={updateTerms}
                    /> Agree to <Link href="/terms"><a className='text-purple-500 hover:text-purple-400'>Terms and Conditions</a></Link>
                    </div>

                    {!terms ? 
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">

                        <button disabled className="shadow opacity-20 bg-purple-500 cursor-auto focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>

                        </div>
                    </div>
                    :
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">

                        <button onClick={submitForm} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>

                        </div>
                    </div>
                    }

                </form>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {

    const S3_BUCKET = process.env.S3_BUCKET;
    const AWSAccessKeyId = process.env.AWSAccessKeyId
    const AWSSecretKey = process.env.AWSSecretKey

    return {
        props: { S3_BUCKET, AWSAccessKeyId, AWSSecretKey },
    }
}