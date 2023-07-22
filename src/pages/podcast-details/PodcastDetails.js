import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import './style.css';
import Button from './../../components/Button';
import { toast } from 'react-toastify';
import EpisodeDetails from '../../components/EpisodeDetails';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import ProfileNav from '../../components/ProfileNav/ProfileNav';


function PodcastDetails(props) {
    const { id }=useParams();
    const [podcast,setPodcast] = useState({});
    const navigate = useNavigate();
    const [episodes,setEpisodes] = useState([]);
    const [playingFile , setPlayingFile] = useState('');
    
    useEffect(()=>{
        if(id)
            getdata();
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot)=>{
                const episodesData = [];
                querySnapshot.forEach((doc)=>{
                    episodesData.push({id:doc.id, ...doc.data()});
                });
                setEpisodes(episodesData);
            },
            (error)=>{
                console.error("Error fetching Episodes: ",error);
            }
        );

        return ()=>{
            unsubscribe();
        }
    },[]);

    async function getdata(){
        try{
            const docRef = doc(db,"podcasts",id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setPodcast({id,...docSnap.data()})
            }
            else{
                toast.error("No such document present.");
            }
        }
        catch(err){
            console.error(err.message);
           toast.error("something went wrong, please try again!");
        }

    }

    return (
        <div className='podcast-detail'>
            <ProfileNav>
                <Button text='Profile' handleClick={()=>{navigate('/profile')}}   />
                <Button text='Podcasts' handleClick={()=>{navigate('/podcasts')}}   />
                <Button text='Start A Podcast' handleClick={()=>{navigate('/create_podcast')}}   />
            </ProfileNav>
            <div className='detail-container' >
                <div className='podcast-button'>
                    <h1>{podcast.title}</h1>
                    {
                        podcast.createdBy === auth.currentUser.uid ? <Button text={"Create Episode"} handleClick={()=>{
                            navigate(`/podcast/${id}/create_episode`);
                        }} /> : <></>
                    }
                </div>
            
                <div className='bannerImg'>
                    <img src={podcast.bannerImage} alt="banner-img" />
                </div>
                <p> {podcast.description} </p>
                    {
                        episodes.length > 0 ?
                        <div className='ep-container'>
                            <h1>Episodes :</h1>
                            <div>
                                {
                                    episodes.map((episode,i)=><EpisodeDetails key={episode.id} title={episode.title} description={episode.description}  audio={episode.audio} index={i+1} onClick={(file)=>{ setPlayingFile(file) } } />)
                                }
                            </div>
                        </div>
                        :<></>
                    }
            </div>
            {
                playingFile?<AudioPlayer audio={playingFile} img={podcast.displayImage} />:<></>
            }
        </div>
    );
}

export default PodcastDetails;