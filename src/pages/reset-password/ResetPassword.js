import React,{useState} from 'react';
import '../signup-login/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PosterImage from '../../components/PosterImage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Nav from '../../components/Nav';
import { responsivefunction } from '../../slices/responsiveSlice';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ResetPassword(props) {
    const [email,setEmail] = useState('');
    const [errorMessage, setErrorMessage]= useState('');
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleReset(){

        if( email.trim()===''){
            setErrorMessage("Email fields Can't be Empty!!!");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try{
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
            toast.success("Reset Password Email sent successfully");
            setLoading(false);
            navigate('/login');
        }
        catch(error){
            console.log(error.message);
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
        setEmail('');
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
                        <p>Please Enter Your Email to reset the Password </p>
                    </div>

                    <Input type='email' placeholder='Email' value={email} setData={setEmail} />
                    
                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <Button handleClick={handleReset} text={loading?('loading....'):("Reset Password")} />

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

export default ResetPassword;