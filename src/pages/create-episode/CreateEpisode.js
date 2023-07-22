import React, { useState } from 'react';
import '../signup-login/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import PosterImage from '../../components/PosterImage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Nav from '../../components/Nav';
import { useDispatch } from 'react-redux';
import { responsivefunction } from '../../slices/responsiveSlice'
import InputFile from '../../components/InputFile';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';


function CreateEpisode(props) {

    const [ title , setTitle] = useState('');
    const [ description , setDescription] = useState('');
    const [ audioFile , setAudioFile] = useState(null);
    const [errorMessage, setErrorMessage]= useState('');
    const [loading,setLoading] = useState(false);
    const {id}=useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleEpisode(){

       if(title.trim()==='' || description.trim()==='' || audioFile=== null){
        setErrorMessage("All fields are Mandatory!!!");
        return;
       }

       setErrorMessage();
       setLoading(true);

       try{
            const audioRef= ref(storage, `podcast-episode/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(audioRef,audioFile);
            const audioUrl = await getDownloadURL(audioRef);
            const episodeData = {
                title : title,
                description : description,
                audio : audioUrl,
            };

            await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
            setLoading(false);
            toast.success("Episode Created Sucessfully");
            setTitle('');
            setDescription('');
            setAudioFile(null);
       }
       catch(err){
            console.error(err.message);
            toast.error("Something went wrong");
            setLoading(false);
       }
    
    }

    return (
        <div className='signup'
            onClick={()=>{
                dispatch(responsivefunction());
            }} 
        >
            
            <div className='input-container'>

                <Nav />

                <div className='content'>
                    <div>
                        <h1>Welcome!</h1>
                        <p>Create an Episode</p>
                    </div>

                    <Input type="text" placeholder='Title' value={title} setData={setTitle} />

                    <Input type="text" placeholder='Description' value={description} setData={setDescription} />

                    <InputFile id='displayImg' accept={'audio/*'} class='inputFile' text="Select Audio File" data={audioFile}  handleFiles={setAudioFile} />

                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <Button handleClick={handleEpisode} text={loading?('loading...'):('Create Episode')} />
                </div>
            </div>
            
            <PosterImage>
                <div className='btn-container' >
                    <Button  text='Signup' 
                        handleClick={()=>{
                            navigate('/');
                        }}
                    />
                    <Button  text='Podcasts' 
                        handleClick={()=>{
                            navigate('/podcasts');
                        }}
                    />
                </div>
            </PosterImage>

        </div>
    );
}

export default CreateEpisode;