import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './navLinks.css';

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact>HOME</NavLink>
            </li>
            <li>
                <NavLink to='/about' exact>ABOUT</NavLink>
            </li>
            <li>
                <NavLink to='/skills' exact>SKILLS</NavLink>
            </li>
            <li>
                <NavLink to='/works' exact>WORKS</NavLink>
            </li>
            <li>
                <NavLink to='/awards' exact>AWARDS</NavLink>
            </li>
            <li>
                <NavLink to='/contact' exact>CONTACT</NavLink>
            </li>
            {auth.isLoggedIn && <li>
                <NavLink to='/admin'>DASHBOARD</NavLink>
            </li>}
            {auth.isLoggedIn && <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>}
        </ul>
    );
}

export default NavLinks;