import React, { useEffect } from 'react';
import Esection1 from '../modules/Esection1';
import Esection2 from '../modules/Esection2';
import Esection3 from '../modules/Esection3';
import Esection4 from '../modules/Esection4';
import '../../css/earth.scss';
import E_swiper from '../modules/E_swiper';

function Earth() {




    return (
        
        <div className="earth-section">
             <div className="vidbox">
            <video
            src={process.env.PUBLIC_URL +"/images/earth/intro.mp4"}
            autoPlay
            muted
            loop
            playsInline
            >
            pg2백영상
            </video>
            </div>
           <E_swiper/>
        </div>
    );
}

export default Earth;