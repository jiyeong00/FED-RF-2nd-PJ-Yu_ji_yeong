import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../css/earth.scss";
// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import Esection1 from "./Esection1";
import Esection2 from "./Esection2";
import Esection3 from "./Esection3";
import Esection4 from "./Esection4";
import FooterArea from "../layout/FooterArea";

export default function E_swiper() {





    return (
        
       
        <>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                className="e_swiper"
            >
                <SwiperSlide>
                    <Esection1 />
                </SwiperSlide>
                <SwiperSlide>
                    <Esection2 />
                </SwiperSlide>
                <SwiperSlide>
                    <Esection3 />
                </SwiperSlide>
                <SwiperSlide>
                    <Esection4 />
                </SwiperSlide>
                <SwiperSlide>
                <FooterArea />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
