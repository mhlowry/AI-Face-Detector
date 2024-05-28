import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt>
                <div className="tilt pa3" style={{ height: '300px',}}>
                    <img style={{paddingTop: '5px', height: '100%'}} src={brain} alt='logo'></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;