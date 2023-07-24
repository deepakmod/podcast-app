import React, { useEffect, useState } from 'react';
import { onSnapshot , collection, query} from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts} from '../../slices/podcastSlice';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import './style.css';
import Input from '../../components/Input';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { responsiveNav } from '../../slices/responsiveSlice';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Podcasts(props) {

    const [search , setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const podcasts = useSelector((state)=>state.podcasts.podcasts);
    useEffect(() =>{
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot)=>{
                const podcastData = [];
                querySnapshot.forEach((doc)=>{
                    podcastData.push({id:doc.id , ...doc.data()});
                });
                dispatch(setPodcasts(podcastData));
            },
            (error)=>{
                toast.error("Something went wrong");
                console.error(error);
            }
        );
        return ()=>{
            unsubscribe();
        }
    },[dispatch]);


    let filteredPodcasts = podcasts.filter(podcast =>podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <div className='podcasts'
            onClick={(e)=>{
                dispatch(responsiveNav());
            }}
        >
           <ProfileNav>
                <Button text='Signup' handleClick={()=>{navigate('/')}} />
                <Button text='Profile' handleClick={()=>{navigate('/profile')}}   />
                <Button text='Start A Podcast' handleClick={()=>{navigate('/create_podcast')}}   />     
           </ProfileNav>
            <div className='podcast-body'>
                <Input type="input" placeholder='Search by Title' setData={setSearch} />
            {
                filteredPodcasts.length > 0 ?
                <div className='podcast-container'>{
                        filteredPodcasts.map((podcast)=>
                        <PodcastCard key={podcast.id} id={podcast.id}  title={podcast.title} description={podcast.description} imgSrc={podcast.displayImage}  />
                        )
                }</div>
                :<h1 className='empty-podcast' >{search?"Podcast not found":"No Podcast avilable."}</h1>
            }
            </div>
        </div>
    );
}

export default Podcasts;