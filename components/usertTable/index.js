import * as React from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useSession } from "next-auth/client";
import { useState } from 'react'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TableData from '../tableData'


export default function userTable( props ) {
  const [session] = useSession()
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState("");
  
  let user
  let soundArray = []

  if (session) {
    user = session.user.id
    //console.log(user)
    const sounds = props.sounds.map((sound) => {
      if (user === sound.createdBy) {
        soundArray.push(sound)
        //console.log(soundArray)
      }
    })

    function clearDrops() {
      setFilteredData([]);
      setWordEntered("");
  
    }
  
      function handleFilter(event) {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = soundArray.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase())
        });
  
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };



    return (
      <Container maxWidth="lg" className="py-14">
          <div className="grid justify-center py-14">
            {filteredData.length > 0 ? 
              <div className='flex justify-center'>
                <TextField 
                id="standard-basic" 
                label="Search Sound Name" 
                variant="standard" 
                value={wordEntered}
                onChange={handleFilter}/>
                <div className="align-middle">
                  {filteredData.length === 0 ? (
                    <SearchIcon />
                  ) : (
                      <CloseIcon className="hover:opacity-20 hover:cursor-pointer" id="clearBtn" onClick={clearDrops} />
                  )}
                </div>

              </div>
              :
              <div className='flex justify-center'>
                <TextField 
                id="standard-basic" 
                label="Search Sound Name" 
                variant="standard" 
                value={wordEntered}
                onChange={handleFilter}/>
                <div className="align-bottom">
                  {filteredData.length === 0 ? (
                  <SearchIcon />
                  ) : (
                    <CloseIcon className="hover:opacity-20 hover:cursor-pointer" id="clearBtn" onClick={clearDrops} />
                  )}
                </div>
              </div>
            }
        </div>

        {filteredData.length > 0 ?
          <TableData props={filteredData} />
              :
          <TableData props={soundArray} />
        }
      </Container>

    );
  } else {
    return <Link href="/"></Link>
  }
}


export async function getServerSideProps(ctx) {

    const props = { }
    const accounts = await dbInfo()

    return {
        props: { accounts },
    }
}
