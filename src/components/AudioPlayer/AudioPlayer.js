import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { FaPlay ,FaPause ,FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
function AudioPlayer(props) {
    const audioRef = useRef(); 
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);
    const [volume,setVolume] = useState(1);
    const [isMute,setIsMute] = useState(false);
    const [isPlaying,setIsPlaying] = useState(true);


    useEffect(()=>{
        isPlaying ?audioRef.current.play():audioRef.current.pause();
    },[isPlaying,props.audio]);

    useEffect(()=>{
        if(isMute)
        {
            audioRef.current.volume=0;
            setVolume(0);
        }
        else
        {
            audioRef.current.volume=1;
            setVolume(1);
        }
    },[isMute]);

    useEffect(()=>{
        const audio = audioRef.current;
        audio.addEventListener("timeupdate",handleTimeUpdate);
        audio.addEventListener("loadedmetadata",handleLoadedMetadata);
        audio.addEventListener("ended",handleEnded);

        return ()=>{
            audio.removeEventListener("timeupdate",handleTimeUpdate);
            audio.removeEventListener("loadedmetadata",handleLoadedMetadata);
            audio.removeEventListener("ended",handleEnded);
        }
    },[]);


    function handleTimeUpdate(){
        setCurrentTime(parseFloat(audioRef.current.currentTime));
    }

    function handleLoadedMetadata(){
        setDuration(parseFloat(audioRef.current.duration))
    } 

    function handleEnded(){
        setCurrentTime(0);
        setIsPlaying(false);
    }

    function handleDuration(e){
        setCurrentTime(e.target.value);
        audioRef.current.currentTime=e.target.value;
    }

    function handleAudio(e){
        setVolume(e.target.value);
        audioRef.current.volume=e.target.value;
        if(e.target.value === 0)
            setIsMute(true)
    }

    function togglePlay(){
        isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    }

    function toggleSound(){
        isMute ? setIsMute(false) : setIsMute(true);
    }

    function formatTime(time){
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60);
        return `${minutes}:${seconds < 10 ? '0':'' }${seconds}`
    }

    return (
        <div className='audio-player' >
            <img src={props.img} alt='display' />
            <audio ref={audioRef} src={props.audio}></audio>
            
            <div className='duration-flex'>
            <span onClick={togglePlay} >{isPlaying?<FaPause/>:<FaPlay/>}</span>
                <p>{formatTime(currentTime)}</p>
                <input type='range' max={duration} min={0} value={currentTime} onChange={handleDuration}  className='duration-range' />
                <p>-{formatTime(duration-currentTime)}</p>
            </div>

            <div className='volume-flex'>
                <span onClick={toggleSound} >{isMute?<FaVolumeMute/>:<FaVolumeUp/>}</span>
                <input type='range' value={volume} max={1} min={0} onChange={handleAudio} step={0.1} className='volume-range' />
            </div>

        </div>
    );
}

export default AudioPlayer;