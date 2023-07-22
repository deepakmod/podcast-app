import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <div className='nav-container'>
            <nav>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/podcasts">Podcasts</NavLink>
                <NavLink to="/start-a-podcast">Start a Podcast</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </nav>
        </div>
    );
}

export default Header;