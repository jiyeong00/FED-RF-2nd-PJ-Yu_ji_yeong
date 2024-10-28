import React from 'react';
import { Outlet } from 'react-router-dom';

function MainArea(props) {
    return (
        <main>
            <Outlet/>
        </main>
    );
}

export default MainArea;