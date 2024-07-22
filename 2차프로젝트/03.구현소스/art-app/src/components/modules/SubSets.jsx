// 서브페이지 - 용량 (세번째페이지)

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import $ from "jquery";

//데이터 불러오기
import sub_sets from "../data/sub/sub_sets";
import { Swiper, SwiperSlide } from "swiper/react";

// css
import "swiper/css";
import "../../css/sub_sets.scss";
import mFn from "../func/my_function";
import { aCon } from "./aCon";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function SubSets({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_sets[catName])[subCatName];
  // 용량 슬라이드 4개이하면 버튼 안보이게 할려고 만든 변수
  const selData = sub_sets[catName][selSubCatName];
  // 강제리랜더링을 위한 상태변수
  const [force, setForce] = useState(false);

  // 잔역변수 사용
  const myCon = useContext(aCon);

  // 전역 로그인 상태 변수 확인(변수할당!)
  const sts = myCon.loginSts;

  // 컴포넌트 전역변수
  const myRef = useRef(null);
  useEffect(() => {
    const slideItem = mFn.qsa(".sub3-slide img");
    const slideLeng = slideItem.length;
    // console.log("요 안나오네?", slideItem.length);
    if (slideLeng <= 4) {
      $(".swiper-button-prev").fadeOut();
      $(".swiper-button-next").fadeOut();
    } else {
      $(".swiper-button-prev").fadeIn();
      $(".swiper-button-next").fadeIn();
    }
  });

  useEffect(() => {
    const wishCancle = mFn.qsa(".wish-cancle");
    const chgHeart = mFn.qsa(".add-wish");
    wishCancle.forEach((ele, idx) => {
      chgHeart.forEach((v, i) => {
        console.log(idx, i);
        // if (
        //   ele.idx - 1 == i
        // ) {
        //   v.classList.add("on");
        // }
      });
    });
  });
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
//////////////////////////////////////////////////////
  }, [myCon.delWish]);

  //위시리스트 하트 붉게만들기
  useEffect(() => {
    console.log("다시읽어!!!");
    /////////////하트 붉게
    clickHeart();
  }, [force, myCon.force]);

  function clickHeart() {
    let locals;
    if (localStorage.getItem("wish-data"))
      locals = JSON.parse(localStorage.getItem("wish-data"));
    else locals = [];

    const chgHeart = mFn.qsa(".add-wish");

    locals.forEach((ele) => {
      chgHeart.forEach((v, i) => {
        if (
          ele.idx - 1 == i &&
          ele.gCatName == catName &&
          ele.gSubCatName == selSubCatName
        ) {
          v.classList.add("on");
        }
      });
    });
  }

  // $(".wish-xmark").mFn

  //////////////////////////////////////////////////////////////////////////////
  /////로그인상태 확인
  // if (sts) {
  //   console.log("로그인");
  // } else console.log("로그아웃");

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
                  600: {
                    slidesPerView: 2,
                  },
                  550: {
                    slidesPerView: 1,
                  },
                }}
                //   하단불릿
                speed={1000}
                // loop={true}
                className="mySwiper2"
              >
                {/* // 로그아웃상태 */}
                {!sts &&
                  selData.map((v, i) => (
                    <SwiperSlide key={i}>
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

                {/* //////////////여기까지 로그아웃상태 일때 */}

                {/* // 로그인 상태 일때 */}
                {sts &&
                  selData.map((v, i) => (
                    <SwiperSlide
                      style={{ cursor: "pointer" }}
                      key={i}
                      onClick={() => {
                        // 오른쪽으로 이동하여 사라짐
                        $("#wishlist").animate(
                          {
                            right: "-60vw",
                          },
                          400
                        );

                        // 상품정보 업데이트

                        let locals;
                        if (localStorage.getItem("wish-data"))
                          locals = JSON.parse(
                            localStorage.getItem("wish-data")
                          );
                        else locals = [];

                        ///////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!

                        //로컬스에 같은데이터가 있으면 true
                        let temp = locals.some((v2) => {
                          if (
                            v2.gCapacity == v.capacity &&
                            v2.gCatName == catName &&
                            v2.gSubCatName == selSubCatName
                          ) {
                            return true;
                          } else {
                            ///////////하트 붉게
                            clickHeart();
                          }
                        });
                        if (temp) {
                          alert("이미 등록하신 상품입니다~!");
                          return;
                        }

                        locals.push({
                          // cat: cat,
                          idx: v.idx,
                          gCapacity: v.capacity,
                          gCatName: catName,
                          gSubCatName: selSubCatName,
                          // cnt: $("#sum").val(),
                          /************************** 
                          [데이터 구조정의]
                          1. idx : 상품번호
                          2. gCapacity : 상품정보
                          3. gCatName: 대분류
                          4. gSubCatName: 소분류
                          3. cnt : 상품개수
                        ***************************/
                        });

                        // 로컬스에 문자화하여 입력하기
                        localStorage.setItem(
                          "wish-data",
                          JSON.stringify(locals)
                        );

                        setForce(!force);

                        // 카트 상태값 변경
                        myCon.setLocalsWish(localStorage.getItem("wish-data"));
                        // 카트리스트 생성 상태값 변경
                        myCon.setWishSts(true);
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
                      <div className={`add-wish add-${i + 1}`}>
                        <FontAwesomeIcon icon={faHeart} className="fa-heart" />
                        <p style={{ display: "none" }}>{v.capacity}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                {/* //////////////여기까지 로그인일때 */}
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

// function delHeart() {
//   let locals;
//   if (localStorage.getItem("wish-data"))
//     locals = JSON.parse(localStorage.getItem("wish-data"));
//   else locals = [];

//   const wishEle = mFn.qsa(".add-wish");

//   locals.forEach((ele) => {
//     wishEle.forEach((v, i) => {
//       const capEle = v.querySelector("p");
//       const capEleText = capEle.textContent;

//       if (
//         ele.gCatName == catName &&
//         ele.gSubCatName == selSubCatName &&
//         ele.gCapacity == capEleText
//       ) {
//         v.classList.add("on");
//       } else {
//         v.classList.remove("on");
//       }
//     });
//   });
// }

export default { SubSets };
