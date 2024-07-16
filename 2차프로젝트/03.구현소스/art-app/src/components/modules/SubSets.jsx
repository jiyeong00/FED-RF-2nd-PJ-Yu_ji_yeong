// 서브페이지 - 용량 (세번째페이지)

import React, { useContext, useEffect, useRef, useState } from "react";
import $ from "jquery";

//데이터 불러오기
import sub_sets from "../data/sub/sub_sets";
import { Swiper, SwiperSlide } from "swiper/react";

// css
import "swiper/css";
import "../../css/sub_sets.scss";
import mFn from "../func/my_function";
import { aCon } from "./aCon";

function SubSets({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_sets[catName])[subCatName];
  const selData = sub_sets[catName][selSubCatName];
  const sNum = 0;
  // 용량 슬라이드 4개이하면 버튼 안보이게 할려고 만든 변수

  // 잔역변수 사용
  const myCon = useContext(aCon);

  // 상태변수///////////////////////////////////////////////////
  const [tot, setTot] = useState(selData);
  // console.log(tot.capacity);

  // 상품정보 개별 셋업
  // cat - 카테고리
  // let cat = tot.cat;
  // capacity - 상품이름
  let gCapacity = tot.capacity;
  // gIdx - 상품고유번호
  let gIdx = tot.idx;

  // 컴포넌트 전역변수
  const myRef = useRef(null);
  useEffect(() => {
    const slideItem = mFn.qsa(".sub3-slide img");
    const slideLeng = slideItem.length;
    console.log("요 안나오네?", slideItem.length);
    if (slideLeng <= 4) {
      $(".swiper-button-prev").fadeOut();
      $(".swiper-button-next").fadeOut();
    } else {
      $(".swiper-button-prev").fadeIn();
      $(".swiper-button-next").fadeIn();
    }
  });

  // [ 로컬스에 데이터 넣기 ]//////////////////////////
  // 1. 로컬스 없으면 만들기!
  if (!localStorage.getItem("wish-data")) {
    localStorage.setItem("wish-data", "[]");
  } //// if /////

  // 2. 로컬스 읽어와서 파싱하기
  let locals = localStorage.getItem("wish-data");
  locals = JSON.parse(locals);

  return (
    selSubCatName != "kit" && (
      // <!-- 2-3. 서브 세번째 -->
      <section className="sub3 sub-area">
        {/* 슬라이드 */}
        <div className="sub3-slide-wrap">
          <h3>다양한 용량의 제품과 세트를 선택 할 수 있습니다.</h3>
          {
            <div className="sub3-swiper-wrap">
              <div
                className="swiper-button-prev"
                onClick={() => {
                  myRef.current.slidePrev();
                }}
              ></div>
              <Swiper
                // 바깥에서 사용하도록 자신을 ref로 저장!
                onInit={(s) => {
                  myRef.current = s;
                  // console.log(SwiperSlide.length);
                  // if(){}
                }}
                // slidesPerView={2}
                spaceBetween={30}
                breakpoints={{
                  1019: {
                    slidesPerView: 4,
                  },
                  800: {
                    slidesPerView: 3,
                  },
                  500: {
                    slidesPerView: 2,
                  },
                  200: {
                    slidesPerView: 1,
                  },
                }}
                //   하단불릿
                speed={1000}
                loop={true}
                className="mySwiper2"
              >
                {selData.map((v, i) => (
                  <SwiperSlide
                    key={i}
                    onClick={() => {
                      // 상품정보 업데이트
                      setTot(v);
                      // 상품정보 박스 보이기
                      // $(".bgbx").show();

                      // 상품정보값만 모아서 다른 배열만들기
                      let newLocals = locals.map((v) => v.capacity);
                      console.log("idx새배열", newLocals);

                      // 인클루드 비교
                      let retSts = newLocals.includes(gCapacity);

                      if (retSts) {
                        // 메시지 보이기
                        alert("이미 위시리스트에 넣은 상품입니다.");
                        //함수나가기
                        return;
                      } ////////if

                      // 4. 로컬스에 객체 데이터 추가하기
                      locals.push({
                        // cat: cat,
                        idx: gIdx,
                        gCapacity: gCapacity,
                        // cnt: $("#sum").val(),
                        /************************** 
                        [데이터 구조정의]
                         1. idx : 상품번호
                         2. gCapacity : 상품정보
                         3. cnt : 상품개수
                       ***************************/
                      });
                      // 로컬스에 문자화하여 입력하기
                      localStorage.setItem("wish-data", JSON.stringify(locals));

                      // 카트 상태값 변경
                      myCon.setLocalsCart(localStorage.getItem("wish-data"));
                      // 카트리스트 생성 상태값 변경
                      myCon.setCartSts(true);

                      console.log(v);
                    }}
                  >
                    <div className="sub3-slide">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/sub/sets/" +
                          catName +
                          "_" +
                          selSubCatName +
                          "_sets_" +
                          (i + 1) +
                          ".png"
                        }
                        alt={v.capacity}
                      />
                    </div>
                    <p>{v.capacity}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className="swiper-button-next"
                onClick={() => {
                  myRef.current.slideNext();
                }}
              ></div>
            </div>
          }
        </div>
      </section>
    )
  );
}

export default SubSets;
