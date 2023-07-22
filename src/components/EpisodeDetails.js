import React from 'react';
import { FaPlay } from 'react-icons/fa';

function EpisodeDetails(props) {
    return (
        <div className='episode'>
            <h3>{props.index} : {props.title}</h3>
            <div className='episode-para'>
                <p>{props.description}</p>
                <button onClick={()=>{
                    props.onClick(props.audio);
                }} >
                    <span>Play</span><FaPlay/>
                </button>
            </div>
        </div>
    );
}

export default EpisodeDetails;