import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Nav(props) {
    const navigate = useNavigate();
    return (
        <nav>
            <span> RIZZ. </span>
            <Button handleClick={()=>{navigate('/profile')}} text='Profile'  />
        </nav>
    );
}

export default Nav;