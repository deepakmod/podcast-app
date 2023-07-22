import React, { useState } from 'react';
import '../signup-login/style.css';
import { useNavigate } from 'react-router-dom';
import { auth, db ,storage } from '../../firebase';
import { addDoc, collection} from 'firebase/firestore';
import { toast } from 'react-toastify';
import PosterImage from '../../components/PosterImage';
import Button from '../../components/Button';
import Input from './../../components/Input';
import InputFile from '../../components/InputFile';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Nav from '../../components/Nav';
import { useDispatch } from 'react-redux';
import { responsivefunction } from '../../slices/responsiveSlice'


function CreatePodcast(props) {

    const [ title , setTitle] = useState('');
    const [ description , setDescription] = useState('');
    const [ bannerImage , setBannerImage ] = useState(null);
    const [ displayImage , setDisplayImage ] = useState(null);
    const [errorMessage, setErrorMessage]= useState('');
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handlePodcast(){

       if(title.trim()==='' || description.trim()==='' || bannerImage===null || displayImage===null){
        setErrorMessage("All fields are Mandatory!!!");
        return;
       }

       setErrorMessage();
       setLoading(true);
       // 1: Uploading file get download link
       try{
        const displayImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(displayImageRef, displayImage);
        const displayImgUrl = await getDownloadURL(displayImageRef);

        const bannerImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImgUrl = await getDownloadURL(bannerImageRef);


        const podcastDetails = {
            title : title,
            description : description,
            bannerImage : bannerImgUrl,
            displayImage : displayImgUrl,
            createdBy : auth.currentUser.uid,
        };
        await addDoc(collection(db,"podcasts"),podcastDetails);
        toast.success("Podcast created successfully");
        setTitle('');
        setDescription('');
        setBannerImage(null);
        setDisplayImage(null);
        setLoading(false);
       }
       catch(error){
        console.error(error);
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
                        <p>Create a Podcast</p>
                    </div>

                    <Input type="text" placeholder='Title' value={title} setData={setTitle} />

                    <Input type="text" placeholder='Description' value={description} setData={setDescription} />

                    <InputFile id='displayImg' accept={'images/*'} class='inputFile' text="Select Dispaly Image" data={displayImage}  handleFiles={setDisplayImage} />

                    <InputFile id='bannerImg' accept={'images/*'} class='inputFile' text="Select Banner Image" data={bannerImage}   handleFiles={setBannerImage} />

                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <Button handleClick={handlePodcast} text={loading?('loading...'):('Create Podcast')} />
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

export default CreatePodcast;