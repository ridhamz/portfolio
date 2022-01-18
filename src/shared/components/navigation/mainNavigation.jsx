import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'

import MainHeader from './mainHeader';
import NavLinks from './navLinks';
import SideDrawer from './sideDrawer';

import './mainNavigation.css';
import Backdrop from './backDrop';
import Logo from '../logo/logo'


const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(d => !d);
    };
    return (
        <Fragment>
            {drawerIsOpen && <Backdrop onClick={openDrawer} />}
               
                <SideDrawer show={drawerIsOpen} onClick={openDrawer}>
                    <nav className='main-navigation__drawer-nav'>
                        <NavLinks />
                    </nav>
                </SideDrawer>

            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawer} >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title '>
                    <Link to='/'><Logo /></Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    );
}

export default MainNavigation;