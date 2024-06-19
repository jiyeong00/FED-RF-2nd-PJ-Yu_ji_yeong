// 서브페이지 - 용량 (세번째페이지)

import React, { useEffect, useRef } from "react";
import $ from "jquery";

//데이터 불러오기
import sub_sets from "../data/sub/sub_sets";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";


// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";

// css
import "../../css/sub_sets.scss";


function SubSets({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_sets[catName])[subCatName];
  const selData = sub_sets[catName][selSubCatName];
  console.log(selSubCatName);

  // 컴포넌트 전역변수
  const myRef = useRef(null);

  useEffect(()=>{
    console.log("스와이퍼객체:",myRef.current);
  });

  return (
    selSubCatName !="kit" &&
    // <!-- 2-3. 서브 세번째 -->
    <section className="sub3 sub-area">
      {/* 슬라이드 */}
      <div className="sub3-slide-wrap">
      <h3>다양한 용량의 제품과 세트를 선택 할 수 있습니다.</h3>
        {
          <>
          <Swiper
          // 바깥에서 사용하도록 자신을 ref로 저장!
          onInit={(s)=>{myRef.current=s;}}
            slidesPerView={4}
            spaceBetween={30}
            //   하단불릿
            speed={1000}
            loop={true}
            //   이동버튼
            // navigation={true}
            // 사용할 모듈을 여기에 적용시킨다
            // modules={[Navigation]}
            className="mySwiper2"
          >
            {selData.map((v, i) => (
              <SwiperSlide key={i}>
                <div className="sub3-slide">
                  <img
                    src={"/img/sub/sets/"+catName+"_"+selSubCatName+"_sets_" + (i+1) + ".png"}
                    alt={v.capacity}
                  />
                </div>
                <p>{v.capacity}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <div class="swiper-button-prev" onClick={()=>{
            myRef.current.slidePrev();

          }}></div>
          <div class="swiper-button-next" onClick={()=>{
          myRef.current.slideNext();

          }}></div>
          </>
        }
      </div>
    </section>
  );
}

export default SubSets;
