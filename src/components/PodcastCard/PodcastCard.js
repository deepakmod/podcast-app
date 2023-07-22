import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai'
function PodcastCard(props) {
    const navigate = useNavigate();
    return (
        <div className='card-wrapper' onClick={()=>{
           navigate(`/podcast/${props.id}`);
        }}  >
            <img src={props.imgSrc} alt="card-img" />
            <div className='img-text'>
                <p className='one' >{props.title}</p>
                <p className='two' >{props.description}</p>
            </div>
        </div>
    );
}

export default PodcastCard;