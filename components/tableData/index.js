import * as React from "react";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Link from "next/link"
import AudioWaveform from "../AudioWaveform";
import { AudioPlayer } from "../AudioPlayer";
import { saveAs } from "file-saver";


function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

const TableData = ({props}) => {
    const sounds = props.map(sound => ({...sound}))
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;
    const count = Math.ceil(sounds.length / PER_PAGE);
    const _DATA = usePagination(sounds, PER_PAGE);

    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };

    useEffect(() => {
      document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
      }, true);
    })
    
    const saveFunc = (url, name) => {
      console.log("download", url, name)
      saveAs(
        url,
        name
      )
    }
 
    return (

      <div className="text-white justify-center table-cont">

        <div aria-label="custom pagination table" className="table-cont px-5 md:px-24">

            {_DATA.currentData().map((sound) => (
              <div key={sound.createdAt} className="grid sm:flex sm:flex-nowrap justify-center sm:justify-between rounded-lg table-div relative">
                <div className="absolute bottom-0 right-0 h-24">
                <img className="table-bg" src="/bg-image.svg"></img>

                </div>

                <div component="th" scope="sounds" className="sm:pl-10 text-center sm:text-left sm:border-b-0 relative sm:w-44">
                  <div className="md:absolute md:top-6">
                  <a className="txt-1">{sound.name}</a><br></br>
                  <Link href={`/publicuser/${encodeURIComponent(sound.createdBy)}`}><a className="text-sm hover:opacity-70 user-text">{sound.userName}</a></Link>
                  </div>
                  <div className="md:absolute md:bottom-6 grid justify-center">
                    <p className="text-xs date-text">{sound.date}</p>
                  </div>
                </div>

                <div className="grid justify-center player-div pl-0 md:pl-7">
                  {/* <audio src={sound.url} controls>
                    Your browser does not support HTML5 audio. Please update your browser to view this media content.
                  </audio> */}
                  {/* trying to get audio wave to work <AudioWaveform FileContext={sound.url} /> */}
                  <div className="mt-0 md:mt-10">
                  <AudioPlayer url={sound.url} />
                  {/* <AudioWaveform fileContext={url} /> */}


                  </div>
                </div>

                <div className="w-80 md:w-36 relative">
                  <div className="md:absolute md:top-6">
                    <ul className="text-xs flex flex-wrap justify-center pt-2 sm:pt-0 lowercase text-white">
                        <li className="mt-0 md:mt-4"><a className="bubble-text">{sound.bpm} bpm</a></li>
                        <li className="mt-0 md:mt-4"><a className="bubble-text">Key {sound.key}</a></li>
                        <li className="mt-0 md:mt-4"><a className="bubble-text">{sound.loop}</a></li>
                        <li className="mt-0 md:mt-4"><a className="bubble-text">{sound.instrument}</a></li>
                        <li className="mt-0 md:mt-4"><a className="bubble-text">{sound.genre}</a></li>

                      </ul>
                  </div>
                </div>

                <div className="absolute md:relative top-4 right-4 md:top-0 md:right-0 cursor-pointer">
                    <a key={sound.url} onClick={() => saveFunc(sound.url, sound.name)}><img className="md:mt-7 md:mr-10" src="/ic_download.svg" alt="Download" /></a>
                </div>
                
              </div>
    
            ))}

    
          </div>
          <div className="text-sm table-footer pt-14 flex justify-center text-white">
            <div className="text-white bg-gwhite rounded-full bg-opacity-30">
              <Pagination
                className="text-white w-full border-none flex justify-between"
                count={count}
                size="large"
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
      </div>
    )
}

export default TableData