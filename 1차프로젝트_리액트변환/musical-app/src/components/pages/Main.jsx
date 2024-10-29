import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/main_swiper.scss";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// 제이쿼리
import $ from "jquery";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEnvelope,
  faLocationDot,
  faPen,
  faPhoneVolume,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Main(props) {
  return (
    <section className="mainArea">
      <Swiper
        slidesPerView={1}
        //   하단불릿
        // direction="vertical"
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        speed={1000}
        loop={true}
        //   이동버튼
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Pagination, Navigation]}
        // 스와이퍼 사이즈별 슬라이드수 변경!
        className="swiper"
      >
        <div class="swiper-wrapper">
          <SwiperSlide>
            <div className="swiper-slide">앙</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide">끄아아아</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide">어캐하는데ㅔㅇ에</div>
          </SwiperSlide>
        </div>
        {/* 불릿 */}
        <div className="swiper-pagination"></div>
      </Swiper>
    </section>
  );
}

export default Main;
