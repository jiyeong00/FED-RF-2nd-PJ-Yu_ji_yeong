import React from 'react';
import { Outlet } from 'react-router-dom';

function MainArea() {
    //// 코드 리턴구역 //////////////
    return(
        <main>
            <Outlet/>
        </main>
    );
}

export default MainArea;