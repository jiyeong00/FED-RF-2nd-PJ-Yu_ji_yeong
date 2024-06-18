// 서브페이지 - 용량 (세번째페이지)

import React from "react";

//데이터 불러오기
import "../data/sub/sub_sets";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/types";
import { SwiperSlide } from "swiper/react";

function SubSet(props) {
    const selData=sub_sets
  return (
    // <!-- 2-3. 서브 세번째 -->
    <section className="sub3 sub-area">
      {/* 슬라이드 */}
      <div className="sub3-slide-wrap">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          //   하단불릿
          speed={1000}
          loop={true}
          //   이동버튼
          navigation={true}
          /* 사용할 모듈을 여기에 적용시킨다 */
          modules={[Navigation]}
          // 스와이퍼 사이즈별 슬라이드수 변경!
          className="mySwiper"
        >
          {selData.map((v, i) => (
            <SwiperSlide key={i}>
              <div className="sub3-slide">
                <div
                  style={i + 1 >= 5 ? { color: "#434343" } : { color: "white" }}
                  className="slide-txt"
                >
                  <h3>{v.tit}</h3>
                  <p>{v.txt}</p>
                </div>
                <img src={v.img} alt={v.tit} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SubSet;
