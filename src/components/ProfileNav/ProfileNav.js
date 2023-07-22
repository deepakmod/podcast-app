import React from 'react';
import Button from '../Button';
import './style.css';

import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
function ProfileNav(props) {

    const navigate= useNavigate();

    return (
        <nav className='podcast-nav'>
            <span>RIZZ.</span>
            <div className='menu-icon' onClick={(e)=>{
                const element = document.getElementsByClassName('nav-buttons')[0];
                element.style.display==='none'?element.style.display='flex':element.style.display='none';
                e.stopPropagation();
            }} ><AiOutlineMenu style={{width:'100%',height:'100%'}} /></div>
            <div className='nav-buttons'>
                <Button text='Logout' handleClick={()=>{
                    signOut(auth)
                    .then(() =>{toast.success("Signed out successfully")})
                    .catch((error) =>{console.error(error)});
                }} />
                <Button text='Podcasts' handleClick={()=>{navigate('/podcasts')}}   />
                <Button text='Start A Podcast' handleClick={()=>{navigate('/create_podcast')}}   />
            </div>
        </nav>
    );
}

export default ProfileNav;