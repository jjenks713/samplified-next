import { useState } from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AllTable from '../allTable';

const keys = ["", "A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
const genres = ["", "edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
const instruments = ["", "fx","guitar","drums","percussion","vocals","bass","keys","string","synth"]

export default function Search(props) {

  const allSounds = props.allSounds
  const data = props.allSounds

  const [searchData, setSearchData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState("");

  function handleSetData(event) {
    const drop = event.target.value
    const newFilter = data.filter((value) => {
      return value.genre.toLowerCase().includes(drop.toLowerCase())
    });
/*     const newFilter1 = data.filter((value) => {
      return value.key.toLowerCase().includes(drop.toLowerCase()) 
    });
    const newFilter2 = data.filter((value) => {
      return value.instrument.toLowerCase().includes(drop.toLowerCase())
    });
    const newFilter3 = data.filter((value) => {
      return value.loop.toLowerCase().includes(drop.toLowerCase())
    }); */

    setSearchData(newFilter)
  }

  function clearDrops() {
    setFilteredData([]);
    setWordEntered("");
    setSearchData([])

  }

    function handleFilter(event) {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase())
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);

      }
    };

    function handleSpecificFilter(event) {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = searchData.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase())
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

  return (
    <>            
    <div className='mx-auto px-4 pt-24'>
      <Link href="/"><a className='hover:bg-opacity-30 hover:cursor-pointer'><img className="mx-auto h-12 w-auto" src="/logo-dark.png" alt="Workflow" /></a></Link>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Search all our Sounds</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
      </p>
    </div><br></br><br></br>

    <div className='mx-auto px-4 py-10'>
      <div className='flex flexwrap justify-center'>
{/*       <div className='pr-10'>
          Key
          <select
          placeholder="Key" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={handleSetData}
          >
          {keys.map(key => (
            <option key={key} placeholder="Key">{key}</option>
          ))
          }
          </select>
        </div>

        <div className='pr-10'>
          Loop or One-shot
          <select
          placeholder="Loop or One-shot" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={handleSetData}
          >
            <option></option>
            <option key={"loop"}>Loop</option>
            <option key={"one-shot"}>One-shot</option>
          </select>
        </div>

        <div className='pr-10'>
          Instrument
          <select
          placeholder="Instrument" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={handleSetData}
          >
          {instruments.map(instrument => (
            <option key={instrument} placeholder="Instrument">{instrument}</option>
          ))
          }
          </select>
        </div> */}

        <div className='pr-10'>
          Genre
          <select 
          value="Genre"
          placeholder="Genre" 
          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          onChange={handleSetData}
          required
          >
            {
                genres.map((genre) => (
                    <option key={genre} placeholder="Genre">
                      {genre}
                    </option>
                ))
            }
          </select>
        </div>
        {searchData.length > 0 ? 
          <div className='flex justify-center'>
            <TextField 
            id="standard-basic" 
            label="Search Sound Name" 
            variant="standard" 
            value={wordEntered}
            onChange={handleSpecificFilter}/>
              {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
                <CloseIcon id="clearBtn" onClick={clearDrops} />
              )}
          </div>
          :
          <div className='flex justify-center'>
            <TextField 
            id="standard-basic" 
            label="Search Sound Name" 
            variant="standard" 
            value={wordEntered}
            onChange={handleFilter}/>
              {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
                <CloseIcon id="clearBtn" onClick={clearDrops} />
              )}
          </div>
        }
        <div className='py-auto'>
          <Button onClick={clearDrops}>Clear</Button>
        </div>
      </div>
    </div>
    

    <AllTable filteredData={filteredData} allSounds={allSounds} searchData={searchData} /> 
    </>
  )
}

