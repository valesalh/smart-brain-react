import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{ width: '150px'}} >
            <Tilt className="br2 shadow-2">
            <div className='TiltBox pa3' style={{ height: '150px', backgroundColor: 'darkgreen'}}>
                <img src={brain} alt='brain logo'/>
            </div>
            </Tilt>
        </div>

    );
}

export default Logo;