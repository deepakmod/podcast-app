import React,{useState} from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import PosterImage from '../../components/PosterImage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Nav from '../../components/Nav';
import { responsivefunction } from '../../slices/responsiveSlice';

function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage, setErrorMessage]= useState('');
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleLogin(){

        if( email.trim()==='' || password.trim()==='' ){
            setErrorMessage("All fields are Mandatory!!!");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try{
            // getting user account with email and password
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email, 
                password
            );

            const user = userCredential.user;

            // getting user doc froom firebase
            const userDoc = await getDoc(doc(db,"users", user.uid));

            const userData = userDoc.data();

            // storing user details inside redux store
            dispatch(setUser({
                name: userData.name,
                email: email,
                uid: user.uid,
                profilePicture: userData.profilePicture,
            }));
            toast.success("You have been successfully Logged in");
            setLoading(false);
            navigate('/profile');
        }
        catch(error){
            console.log(error.message);
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
        setEmail('');
        setPassword('');
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
                        <h1>Hi There!</h1>
                        <p>Welecome to Rizz. Community Dashboard</p>
                    </div>

                    <Input type='email' placeholder='Email' value={email} setData={setEmail} />

                    <Input type='password' placeholder='Password' value={password} setData={setPassword} />

                    <Link className='reset-text' to='/reset_password'  >Forgotten password?</Link>
                    
                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <Button handleClick={handleLogin} text={loading?('loading....'):("Login")} />

                    <p className='login-text'>Don't have an Account? <Link to='/' >Signup</Link></p>
                </div>
            </div>
            
            <PosterImage>
                <div className='btn-container' >
                    <Button  text='Podcasts' 
                        handleClick={()=>{
                            navigate('/podcasts');
                        }}
                    />

                    <Button  text='Start A Podcast' 
                        handleClick={()=>{
                            navigate('/create_podcast');
                        }}
                    />
                </div>
            </PosterImage>
            
        </div>
    );
}

export default Login;