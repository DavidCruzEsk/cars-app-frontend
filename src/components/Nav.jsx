import React from 'react';
import { Outlet } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <nav>
                <h1>Cars App</h1>
            </nav>
            <Outlet />
        </>
    );
};

export default Nav;