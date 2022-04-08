import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AllTable from '../allTable';
import { useSession } from 'next-auth/client';
import Link from 'next/link'

const keys = ["", "A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
const genres = ["", "edm","rock","pop","house","bass-music","cinematic","hip-hop","global","live"]
const instruments = ["", "fx","guitar","drums","percussion","vocals","bass","keys","string","synth"]

export default function Search(props) {

  const [session, loading] = useSession()

  const allSounds = props.allSounds
  const data = props.allSounds

  const [searchData, setSearchData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState("");
  const [noData, setNoData] = useState(true)

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
      //console.log(newFilter)
      setSearchData(newFilter)
    }

    function clearDrops() {
      setFilteredData([]);
      setWordEntered("");
      setSearchData([])
      setNoData(true)
    }

    function handleFilter(event) {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase())
      });

      if (searchWord === "") {
        setFilteredData([]);
        setNoData(true)
      } else {
        setFilteredData(newFilter);
      }
      if (newFilter.length === 0) {
        setNoData(false)
      } else {
        setNoData(true)

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
      if (newFilter.length == 0) {
        setNoData(false)
      } else {
        setNoData(true)
      }
    };

  return (
  <>   
    <div className='w-full'>

        <div className='pt-24 pb-10 w-3/4 mx-auto'>
            <div className='mx-auto px-4 justify-center text-white relative'>
              <div className='flex flex-wrap justify-center lg:absolute lg:top-1/2 lg:bottom-0 lg:transform lg:-translate-y-1/2'>
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


                {/* Search input */}
                {searchData.length > 0 ? 
                  <div className='grid grid-cols-1 gap-0 justify-center'>
                    <div className='row'>
                      <label className='absolute left-1.5 top-4'>
                        {!wordEntered ? (
                          <SearchIcon />
                        ) : (
                            <CloseIcon id="clearBtn" onClick={clearDrops} />
                          )}
                      </label>
                      <input 
                      className='search-input text-white p-5'
                      id="standard-basic" 
                      placeholder="Search Sound Name" 
                      variant="standard" 
                      value={wordEntered}
                      onChange={handleSpecificFilter}/>
                    </div>
                      <br/>
                      {noData ?
                      null
                      :
                      <div className='row text-red-500 text-xs  pb-4'><small>Nothing matches your search! try again...</small></div>
                      }
                  </div>
                  :
                  <div className='grid grid-cols-1 gap-0 justify-center'>
                    <div className='row relative'>
                      <label className='absolute left-1.5 top-4'>
                      {!wordEntered ? (
                        <SearchIcon />
                      ) : (
                          <CloseIcon id="clearBtn" onClick={clearDrops} />
                        )}
                      </label>

                      <input
                      className='search-input text-white p-5 pl-10'
                      id="standard-basic" 
                      placeholder="Search Sound Name" 
                      variant="standard" 
                      value={wordEntered}
                      onChange={handleFilter}/>

                    </div>
                      <br/>
                      {noData ?
                      null
                      :
                      <div className='row text-red-500 text-xs pb-4'><small>Nothing matches your search! try again...</small></div>
                      }
                  </div>

                }

                {/* Genre Dropdown */}
                <div className='w-80 h-10 grid justify-center lg:w-44 lg:pl-6'>
                  <label className='mb-1 bg-theme'><p className="">Genre</p></label>
                  <select 
                  placeholder="Genre" 
                  className="bg-theme text-white w-72 lg:w-44 border rounded-md" 
                  onChange={handleSetData}
                  required
                  >
                    {
                        genres.map((genre) => (
                            <option key={genre} placeholder="Genre" value={genre}>
                              {genre}
                            </option>
                        ))
                    }
                  </select>
                </div>
                

              </div>

              {/* add sound button */}
              <div className='cursor-pointer uppercase grid justify-center lg:relative mt-10 lg:mt-0'>
                  {session ?
                  <Link href="/userpage">
                  <button className='add-yours lg:absolute lg:right-0'>ADD YOUR SOUNDS</button>
                  </Link>
                    :
                  <Link href="/sign-up">
                  <button className='add-yours lg:absolute lg:right-0'>ADD YOUR SOUNDS</button>
                  </Link>
                  }

            </div>
            </div>

        </div>

          
        <div className=''>
          <AllTable filteredData={filteredData} allSounds={allSounds} searchData={searchData} /> 
        </div>


    </div>         

  </>
  )
}

