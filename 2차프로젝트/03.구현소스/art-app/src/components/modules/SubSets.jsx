// 서브페이지 - 용량 (세번째페이지)

import React from "react";
import { Swiper,SwiperSlide } from "swiper/types";
import $ from "jquery";

//데이터 불러오기
import sub_sets from "../data/sub/sub_sets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";



function SubSets({catName,subCatName}) {
    const selData=sub_sets[catName].shinhan;
    console.log(selData);

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

          className="mySwiper"
        >
          {selData.map((v, i) => (
            <SwiperSlide key={i}>
              <div className="sub3-slide">
                <img src={"/img/sub/sets/OilColors_shinhan_sets_"+i+".png"} alt={v.capacity} />
                <p></p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default SubSets;
