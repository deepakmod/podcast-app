import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import './style.css';
import ProfileNav from './../../components/ProfileNav/ProfileNav';
import { FiEdit} from 'react-icons/fi'; 
import { MdModeEdit} from 'react-icons/md'; 
import Button from '../../components/Button';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { setUser } from '../../slices/userSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const user = useSelector(state=>state.user.user);
    const [name,setName] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
        if(user && profileImage) 
            updateProfilePicture();
    },[profileImage]);

    async function updateProfilePicture(){
        try{
            console.log(false);
            const profileImageRef = ref(storage,`profile-picture/${user.uid}/${Date.now()}`);
            await uploadBytes(profileImageRef, profileImage);
            const uploadImageUrl = await getDownloadURL(profileImageRef);
            const docRef = doc(db, "users", user.uid);

            await updateDoc(docRef, {
                profilePicture: uploadImageUrl
            });
            dispatch(setUser({
                name: user.name,
                email: user.email,
                uid: user.uid,
                profilePicture : uploadImageUrl,
            }));
        }
        catch(error){
            toast.error('Something went wrong');
            console.error(error.message);
        }
    }


    async function updateUserName(){
        if(name.trim()===''){
            return;
        }
        try{
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                name: name
            });
            dispatch(setUser({
                name: name,
                email: user.email,
                uid: user.uid,
                profilePicture : user.profilePicture
            }));
            toast.success('Profile updated successfully');
        }
        catch(error){
            toast.err('Something went wrong');
            console.error(error.message);
        }

    }

    async function updatePassword(){
        const auth = getAuth();
        sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
            toast.success("Reset Password email sent successfully");
        })
        .catch((error) => {
            toast.error("Something went wrong");
            console.error(error.message);
        });
    }

    if(!user){
        return <Loader />;
    }

    return (
        <div className='profile-background'>
            <ProfileNav>
                <Button text='Logout' handleClick={()=>{
                    signOut(auth)
                    .then(() =>{toast.success("Signed out successfully")})
                    .catch((error) =>{console.error(error)});
                }} />
                <Button text='Podcasts' handleClick={()=>{navigate('/podcasts')}}   />
                <Button text='Start A Podcast' handleClick={()=>{navigate('/create_podcast')}}   />
            </ProfileNav>
            <div className='profile-container' >
                <div className='img-banner' >  
                    <span className='pencil-icon'> <MdModeEdit /> </span>
                    <img className='banner-image' src={require('../images/banner1.jpg')} alt="banner" />  
                    <label htmlFor='picture' >
                        <div className='profile-img'  > 
                            {
                                user.profilePicture ? <img className='img'src={user.profilePicture} alt="profile" /> : 
                                <img className='img'src={require('../images/man.png')} alt="error-img" />
                            } 
                        </div>
                    </label>
                    <input type="file" id='picture' accept='image/*' style={{display:'none'}} onChange={(e)=>{
                        setProfileImage(e.target.files[0]);
                    }} />
                </div>

                <div className='user-details' >
                    <div className='edit-icon'
                    onClick={()=>{
                        const username=document.getElementById('username');
                        username.focus();
                    }}
                    >
                        <span className='editable' >Edit Profile</span>  <FiEdit /> 
                    </div>
                    <input type='text' id='username' className='data'  onChange={(e)=>{setName(e.target.value)}}  placeholder={ user.name }/>
                    <div className='data' >{user.email}</div>
                    <div>
                        <Button text='Reset Password' handleClick={updatePassword} />
                        <Button text='Save Name' handleClick={updateUserName} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;