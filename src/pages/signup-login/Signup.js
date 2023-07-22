import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import { toast } from 'react-toastify';
import PosterImage from '../../components/PosterImage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import { responsivefunction } from '../../slices/responsiveSlice';



function Signup(props) {

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage]= useState('');
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSignup(){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(name.trim()==='' || email.trim()==='' || password.trim()==='' || confirmPassword.trim()===''){
            setErrorMessage("All fields are Mandatory!!!");
            return;
        }

        if(!emailPattern.test(email)){
            setErrorMessage("Please enter a valid email address!");
            return;
        }

        if(password.length < 6 ){
            setErrorMessage("Password length must be greater than 6 characters!");
            return;
        }

        if(confirmPassword !== password){
            setErrorMessage("Password does not match with confirm password!");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try{
            // creating user account with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email, 
                password
            );

            const user = userCredential.user;
            // creating a doc and storing user details in the doc
            await setDoc(doc(db,"users", user.uid),{
                name: name,
                email: email,
                uid: user.uid,
                profilePicture :null,
            });

            // storing user details inside redux store
            dispatch(setUser({
                name: name,
                email: email,
                uid: user.uid,
                profilePicture : null,
            }));

            toast.success("Account have been sucessfully created");
            setLoading(false);
            navigate('/profile');

        }
        catch(error){
            console.log(error);
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

       setName('');
       setEmail('');
       setPassword('');
       setConfirmPassword('');
    
}

    return (
        <div className='signup' 
            onClick={()=>{
                dispatch(responsivefunction());
            }} 
        >
            
            <div className='input-container'>

                <Nav/>

                <div className='content'>

                    <div>
                        <h1>Hi There!</h1>
                        <p>Welecome to Rizz. Community Dashboard</p>
                    </div>

                    <Input type='text' placeholder='Full Name' value={name} setData={setName} />

                    <Input type='email' placeholder='Email' value={email} setData={setEmail} />

                    <Input type='password' placeholder='Password' value={password} setData={setPassword} />

                    <Input type='password' placeholder='Confirm Password' value={confirmPassword} setData={setConfirmPassword} />

                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <Button text={loading?('loading...'):('Signup Now')}  handleClick={handleSignup} />

                    <p className='login-text'>Already have a Account? <Link to='login' >Login</Link></p>

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

export default Signup;