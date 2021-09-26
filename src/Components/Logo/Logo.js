import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';



const Logo = () => {
    return (
        <div className="logo">
			<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 			<div className="Tilt-inner"><img className="img" alt="markhor" src={logo} /></div>
			</Tilt>
		</div>
    );
}

export default Logo;