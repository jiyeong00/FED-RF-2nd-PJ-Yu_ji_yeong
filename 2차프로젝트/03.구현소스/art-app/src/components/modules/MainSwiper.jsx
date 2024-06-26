import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/main_swiper.scss";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// 데이터 불러오기
import slideData from "../data/main_slide_data";

// 함수 연결
import mFn from "../func/my_function.js";

// console.log(slideData);

function MainSwiper() {
  const selData = slideData;

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    const main3box = mFn.qsa(".box-wrap > *");
    const main3H2 = mFn.qs(".main3-tit h2");
    const main3Span = mFn.qs(".main3-tit span");
    // console.log(main3box);
    if (!main3box) return;
    if (!main3H2) return;
    if (!main3Span) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;

      main3box.forEach((ele) => {
        const bcrVal = ele.getBoundingClientRect();
        const bcrValH = main3H2.getBoundingClientRect();
        // const bcrValS = main3Span.getBoundingClientRect();
        if (bcrVal.top < CRITERIA) {
          ele.classList.add("on");
        }
        if (bcrValH.top < CRITERIA) {
          main3H2.style.top = "0";
          main3H2.style.opacity = "1";
          main3H2.style.transition = ".6s ease-in-out";
          main3Span.style.top = "0";
          main3Span.style.opacity = "1";
          main3Span.style.transition = ".9s ease-in-out";

          window.removeEventListener("scroll", handleScroll);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // width 값 실시간으로 가져오기
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="main3 main-area">
        {/* <!-- 2-2-1. 메인 슬라이드 제목 --> */}
        <div className="main3-tit">
          <h2 className="main-title core-h2">News</h2>
          <span className="core-span">
            신한화구의 최신 정보와 브랜드, 제품, 이벤트 등 활동 전반에 관한
            소식을 확인하세요.
          </span>
        </div>
        {/* 슬라이드 */}
        <div className="main3-slide-wrap">
          <div className="box-wrap">
            <div className="red-box2"></div>
            <div className="white-box2"></div>
          </div>
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
                    <div className="title-logo">
                      <img src="/img/title_logo.png" alt="로고이미지" />
                      <h3 className="">{v.tit}</h3>
                    </div>
                    <p>{v.txt}</p>
                  </div>
                  {width > 800 && (
                    <img
                      src={"img/main_slide/main3_slide" + (i + 1) + ".png"}
                      alt={v.tit}
                    />
                  )}
                  {width <= 800 && (
                    <img
                      src={"img/main_slide/main3_slide" + (i + 1) + "_M.png"}
                      alt={v.tit}
                    />
                  )}
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
