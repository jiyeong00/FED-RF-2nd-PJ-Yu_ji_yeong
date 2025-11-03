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
import newsData from "../data/news_data.js";

// 함수 연결
import mFn from "../func/my_function.js";

// console.log(slideData);

function MainSwiper() {
  const selData = newsData;

  useEffect(() => {
    const inc05_tit = mFn.qs("#inc05 .tit_box");
    const inc05_list = mFn.qs("#inc05 .news_list");
    if (!inc05_tit) return;
    if (!inc05_list) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;
      const scrollLocation = inc05_tit.getBoundingClientRect().top;
      const scrollLocation2 = inc05_list.getBoundingClientRect().top;

      if (scrollLocation < CRITERIA) {
        inc05_tit.style.opacity = 1;
        inc05_tit.style.transform = "translateY(0)";
      } else {
        inc05_tit.style.opacity = 0;
        inc05_tit.style.transform = "translateY(2rem)";
      }
      if (scrollLocation2 < CRITERIA) {
        inc05_list.style.opacity = 1;
        inc05_list.style.transform = "translateY(0)";
      } else {
        inc05_list.style.opacity = 0;
        inc05_list.style.transform = "translateY(2rem)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="main5 main-area part">
        <article id="inc05">
          {/* <!-- 슬라이드 제목 --> */}
          <div className="tit_box">
            <h3 className="tit">
              <span className="tit_txt">
                Our
                <em>News Room</em>
              </span>
            </h3>
            <p className="txt">제비그룹의 언론보도 소식을 만나보세요</p>
          </div>
          {/* 슬라이드 */}
          <div className="news_list">
            <ul>
              <Swiper
                slidesPerView={5}
                speed={1000}
                //   자동넘김
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                /* 사용할 모듈을 여기에 적용시킨다 */
                modules={[Autoplay]}
                // 스와이퍼 사이즈별 슬라이드수 변경!
                className="mySwiper"
              >
                {selData.map((v, i) => (
                  <SwiperSlide key={i} className="SwiperSlide">
                    <li>
                      <div className="aInDiv">
                        <p className="s_tit">NEWS</p>
                        <div className="cont_box">
                          <p className="tit">{v.tit}</p>
                          <div className="txt">{v.exp}</div>
                          <p className="date">{v.date}</p>
                        </div>
                        <div className="more_btn">GO</div>
                      </div>
                    </li>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}

export default MainSwiper;
