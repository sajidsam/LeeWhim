import React from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <>
        <Navbar></Navbar>
            <Outlet></Outlet>
        <Footer></Footer>
        
        </>
    );
};

export default HomeLayout;