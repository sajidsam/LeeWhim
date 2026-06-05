import React from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className="px-6 md:px-10">
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;