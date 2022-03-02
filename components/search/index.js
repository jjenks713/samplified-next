import { useState } from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';



export default function Search(props) {

  let soundArray = []
  const [genre, setGenre] = useState('')
  const [key, setKey] = useState('')
  const [instrument, setInstrument] = useState('')
  const [loop, setLoop] = useState('')
  const [searchBox, setSearchBox] = useState('')
  console.log(genre, key, instrument, loop, searchBox)
  
  const keys = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
  const genres = ["edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
  const instruments = ["fx","guitar","drums","percussion","vocals","bass","keys","string","synth"]

  function clearDrops() {
    setGenre('')
    setKey('')
    setInstrument('')
    setLoop('')
    setSearchBox('')
  }

  function submitForm(e) {
    e.preventDefault()
    console.log('click', searchBox)
  }


  console.log(soundArray)

  const sounds = props.allSounds.map((sound) => {
    if (genre === sound.genre) {
      soundArray.push(sound)
    } 
    if (key === sound.key) {
      soundArray.push(sound)
    }
    if (instrument === sound.instrument) {
      soundArray.push(sound)
    }
    if (loop === sound.loop) {
      soundArray.push(sound)
    }
  })


  return (
    <>            
    <div className='mx-auto px-4 pt-24'>
      <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Search all our Sounds</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
      </p>
    </div><br></br><br></br>
    <div className='grid justify-center'>
    <form>
      <TextField 
      id="standard-basic" 
      label="Search Sound Name" 
      variant="standard" 
      onChange={(e) => setSearchBox(e.target.value)}/>
      <buton onClick={submitForm}><SearchIcon /></buton>
    </form>
    </div>

    <div className='mx-auto px-4 py-10'>
      <div className='flex flexwrap justify-center'>
        <div className='pr-10'>
          Key
          <select
          placeholder="Key" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={(e) => setKey(e.target.value)}
          >
          {keys.map(key => (
            <option key={key}>{key}</option>
          ))
          }
          </select>
        </div>

        <div className='pr-10'>
          Loop or One-shot
          <select
          placeholder="Loop or One-shot" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={(e) => setLoop(e.target.value)}
          >
            <option key={"loop"}>Loop</option>
            <option key={"one-shot"}>One-shot</option>
          </select>
        </div>

        <div className='pr-10'>
          Instrument
          <select
          placeholder="Instrument" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={(e) => setInstrument(e.target.value)}
          >
          {instruments.map(key => (
            <option key={instrument}>{key}</option>
          ))
          }
          </select>
        </div>

        <div className='pr-10'>
          Genre
          <select 
          value={genre} 
          placeholder="Genre" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={(e) => setGenre(e.target.value)}
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
        <div className='py-auto'>
          <Button onClick={clearDrops}>Clear</Button>
        </div>
      </div>
    </div>

    </>
  )
}

