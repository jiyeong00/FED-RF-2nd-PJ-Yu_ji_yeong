import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/main_swiper.scss";

import mFn from "../func/my_function.js";

// 데이터 불러오기
import slideData from "../data/main_slide_data";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
console.log(slideData);

function MainSwiper() {
  const selData = slideData;
  // // 스크롤 등장액션 이벤트 설정
  // mFn.addEvt(window, "scroll", showIt);
  // showIt();

  // function showIt() {
  //   const main3 = mFn.qs(".main3");
  //   const redBox2 = mFn.qs(".red-box2");

  //   // 스크롤 등장 기준설정 : 화면의 2/3
  //   const CRITERIA = (window.innerHeight / 3) * 2;
  //   let bcval = mFn.getBCR(main3);
  //   if (bcval < CRITERIA) {
  //     redBox2.classList.add("on");
  //   } else {
  //     redBox2.classList.remove("on");
  //   }
  // }

  return (
    <>
      <section className="main3 main-area">
        {/* <!-- 2-2-1. 메인 슬라이드 제목 --> */}
        <div className="main3-tit">
          <h2>News</h2>
          <span>
            신한화구의 최신 정보와 브랜드, 제품, 이벤트 등 활동 전반에 관한
            소식을 확인하세요.
          </span>
        </div>
        {/* 슬라이드 */}
        <div className="main3-slide-wrap">
          <div className="red-box2"></div>
          <Swiper
            slidesPerView={1}
            //   하단불릿
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            speed={1000}
            //   자동넘김
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            //   이동버튼
            navigation={true}
            /* 사용할 모듈을 여기에 적용시킨다 */
            modules={[Pagination, Navigation, Autoplay]}
            // 스와이퍼 사이즈별 슬라이드수 변경!
            className="mySwiper"
          >
            {selData.map((v, i) => (
              <SwiperSlide key={i}>
                <div className="main3-slide">
                  <div
                    style={
                      i + 1 >= 5 ? { color: "#434343" } : { color: "white" }
                    }
                    className="slide-txt"
                  >
                    <h3>{v.tit}</h3>
                    <p>{v.txt}</p>
                  </div>
                  <img src={v.img} alt={v.tit} />
                </div>
              </SwiperSlide>
            ))}

            {/* 불릿 */}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default MainSwiper;
