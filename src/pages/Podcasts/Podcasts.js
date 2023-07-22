import React, { useEffect, useState } from 'react';
import { onSnapshot , collection, query, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcasts} from '../../slices/podcastSlice';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import './style.css';
import Input from '../../components/Input';
import NavBar from '../../components/NavBar.js/NavBar';
import { responsiveNav } from '../../slices/responsiveSlice';
import { toast } from 'react-toastify';
function Podcasts(props) {

    const [search , setSearch] = useState('');
    const dispatch = useDispatch();
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
                console.error(error);
            }
        );
        return ()=>{
            unsubscribe();
        }
    },[dispatch]);

    

    async function handleDelete(id){
        try{
            await deleteDoc(doc(db, "podcasts", id));
            toast.success("Podcast deleted successfully");
        }
        catch(error){
            console.error(error.message);
            toast.error("something went wrong");
        }
    }



    let filteredPodcasts = podcasts.filter(podcast =>podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase()));

    return (
        <div className='podcasts'
            onClick={(e)=>{
                dispatch(responsiveNav());

            }}
        >
           <NavBar /> 
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