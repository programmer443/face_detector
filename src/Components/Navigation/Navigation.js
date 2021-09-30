import React from 'react';
import './Navigation.css';




const Navigtion = ({ isSignedIn, onRouteChange }) => {
    if (isSignedIn) {
        return (
            <nav className="header">
			<p onClick={() => onRouteChange('signout')}  className="navigator">Sign Out</p>
		</nav>
        )
    } else {
        return (
            <nav className="header">
			<p onClick={() => onRouteChange('signin')}  className="navigator">Sign In</p>
			<p onClick={() => onRouteChange('register')}  className="navigator">Register</p>

		</nav>
        );
    }
}



export default Navigtion;