import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { HiMiniUserGroup } from 'react-icons/hi2';
function PosterImage(props) {
    return (
        <div className='img-container'>
                <div>
                    <div className='logo-container'>
                        <span>RIZZ.</span>
                        <span 
                        onClick ={(e)=>{
                            let container=document.getElementsByClassName('btn-container')[0];
                            container.style.display === "flex" ? container.style.display='none' : container.style.display='flex';
                            e.stopPropagation();
                        }}
                        className='menu-logo'> <FiMenu/></span>
                    </div>
                    {props.children}
                </div>
                <p className='logo-text'>
                    <span className='logo'><HiMiniUserGroup /></span>
                    <span >Largest Podcast Community</span>
                </p>
                <img src={require('../pages/images/astro.jpg')} alt="astronout" />
                <div className='overflow'>
                    <p>
                        ,,<br/>
                        Go anywhere you want in a 
                        Galaxy full of wonders!
                    </p>
                </div>
            </div>
    );
}

export default PosterImage;