import React from 'react';
import './style.css';
import { AiOutlineMenu } from 'react-icons/ai';
function ProfileNav(props) {

    return (
        <nav className='podcast-nav'>
            <span>RIZZ.</span>
            <div className='menu-icon' onClick={(e)=>{
                const element = document.getElementsByClassName('nav-buttons')[0];
                element.style.display==='none'?element.style.display='flex':element.style.display='none';
                e.stopPropagation();
            }} ><AiOutlineMenu style={{width:'100%',height:'100%'}} /></div>
            <div className='nav-buttons'>
                {props.children}
            </div>
        </nav>
    );
}

export default ProfileNav;