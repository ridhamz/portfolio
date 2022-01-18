import React from 'react';

import burgerLogo from "../../../assets/images/mz2.png";
import './logo.css';

const Logo = () => {
    return (
        <div className="Logo">
            <img src={burgerLogo} alt="Logo" />
        </div>
    );
}

export default Logo;