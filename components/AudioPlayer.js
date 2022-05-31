import React, { useState, useRef, useEffect } from 'react'
import styles from "../styles/AudioPlayer.module.css";
import Forward30Icon from '@mui/icons-material/Forward30';
import Replay30Icon from '@mui/icons-material/Replay30';
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import AudioWaveform from './AudioWaveform'
import { filledInputClasses } from '@mui/material';

const AudioPlayer = ({url}) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation yup

  useEffect(() => {
    const secs = Math.floor(audioPlayer.current.duration);
    loadDuration(secs)
    //progressBar.current.max = secs;

  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const loadDuration = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    setDuration(`${returnedMinutes}:${returnedSeconds}`);
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return (
      <div>
        {returnedMinutes}:{returnedSeconds}
      </div>
    );
  }


  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  return (
    <div className={styles.audioPlayer}>
      <div className='grid justify-center'>

        <div className='flex justify-center mb-0 md:mb-4'>
          {/* current time */}
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

          {/* progress bar */}
          <div className="w-52 md:w-80 relative"
/*           style={
            {
                backgroundImage: `url(/wav.png)`,
                backgroundSize: '100%',
            }
          } */
          >
            <img src="/wav.png" alt="wave" className='h-8 sm:h-12 w-full'/>
            <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
          </div>
          {/* <AudioWaveform /> */}

          {/* duration */}
          
          { duration === `NaN:NaN` ? <div className='pl-4 pt-1 sm:pt-2'> ...</div> : <div className='pl-4 pt-1 sm:pt-2'>{duration}</div> }
        </div>

        <div className='flex justify-center'>
        <audio ref={audioPlayer} src={url} preload="metadata"></audio>

          <button className={styles.forwardBackward} onClick={backThirty}><Replay30Icon /></button>
          <button onClick={togglePlayPause} className={styles.playPause}>
            {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
          </button>
          <button className={styles.forwardBackward} onClick={forwardThirty}><Forward30Icon /></button>
        </div>



      </div>
    </div>

  )
}

export { AudioPlayer }
