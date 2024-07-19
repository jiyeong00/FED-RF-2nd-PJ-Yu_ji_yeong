import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// 제이쿼리
import $ from "jquery";

// css
import "../../css/cart_list.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { aCon } from "./aCon";

import { Navigation } from "swiper/modules";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

function CartList() {
  // 강제리랜더링을 위한 상태변수
  const [force, setForce] = useState(false);
  const [selectedCategory, setSelCategory] = useState("");
  const [groups, setGroups] = useState([]);

  // 컨텍스트 사용
  const myCon = useContext(aCon);

  // 전역 로그인 상태 변수 확인(변수할당!)
  const sts = myCon.loginSts;

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(myCon.localsWish);
  useEffect(() => {
    // 데이터 그룹화해서 초기화
    initializeGroups();
  }, [force]);

  const initializeGroups = () => {
    const groupedData = selData.reduce((acc, i) => {
      // seldata와 acc의 gCatName이 다를 경우 new 그룹 추가
      if (!acc[i.gCatName]) {
        acc[i.gCatName] = {
          gCatName: i.gCatName,
          gCapacities: [i.gCapacity],
          gIdx: i.idx,
          gSubCatName: i.gSubCatName,
        };
        acc[i.gCatName].gCapacities.push([
          i.gCapacity,
          i.idx,
          i.gSubCatName,
        ]);
        // acc[i.gCatName].gCapacities.push([i.gCapacity,i.idx,i.gSubCatName]);
      } else {
        // 같으면 이미 있는 그룹에 추가
        acc[i.gCatName].gCapacities.push([
          i.gCapacity,
          i.idx,
          i.gSubCatName,
        ]);
      }

      return acc;
    }, {});

    let res = JSON.stringify(selData);
    // 3.로컬스 "wish-data"반영하기
    localStorage.setItem("wish-data", res);

    // 4. 카트리스트 전역상태변수 변경
    myCon.setLocalsWish(res);

    // 객체를 배열로 변환합니다.
    const groupsArray = Object.values(groupedData);
    // console.log("그룹 어레이",groupsArray);
    setGroups(groupsArray);
  };

  // 선택된 대분류를 업데이트.
  const handleCatClick = (category) => {
    // 소분류 추가
    setSelCategory(category);
  };

  if (sts) {
    setTimeout(() => {
      $("#mywish").addClass("open");
    }, 500);
  }

  return (
    <>
      <section id="wishlist">
        {/* 닫기 */}
        <a
          href="#"
          className="cbtn cbtn2"
          onClick={(e) => {
            e.preventDefault();
            // 오른쪽으로 이동하여 사라짐
            $("#wishlist").animate(
              {
                right: "-60vw",
              },
              400
            );
            $("#mywish").addClass("on");
          }}
        >
          <FontAwesomeIcon icon={faXmark} className="fa-xmark" />
        </a>

        {/*  제목 */}
        <h1> 위시 리스트</h1>
        <div className="wish-txt">
          <div>
            {groups.map((group, index) => (
              <div key={index}>
                <div className="wish-sub-tit">
                  <strong
                    onClick={() => {
                      handleCatClick(group.gCatName);
                    }}
                  >
                    {/* {console.log("순번?", idx.idx)} */}
                    {group.gCatName}
                  </strong>
                </div>

                <Swiper
                  // slidesPerView={1}
                  spaceBetween={20}
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
                  speed={1000}
                  /* 사용할 모듈을 여기에 적용시킨다 */
                  modules={[Navigation]}
                  // 스와이퍼 사이즈별 슬라이드수 변경!
                  className="mySwiper3"
                >
                  <div className="wish-sub-txt-wrap swiper-wrapper">
                    {/* 선택된 대분류의 소분류들만 출력함. // 스와이퍼*/}
                    {selectedCategory === group.gCatName &&
                      group.gCapacities.map((capacity, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <SwiperSlide className="wish-sub-txt swiper-slide">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/img/sub/sets/" +
                                  group.gCatName +
                                  "_" +
                                  capacity[2] +
                                  "_sets_" +
                                  capacity[1] +
                                  ".png"
                                }
                                alt={capacity[0]}
                              />
                              <p>{capacity[2]}</p>
                              <p>{capacity[0]}</p>
                              <div
                                className="wish-cancle"
                                onClick={() => {
                                  // confirm()의 "확인"클릭시 true
                                  if (window.confirm("삭제하시겠습니까?")) {
                                    // console.log("삭제 예정!!",(group.gCapacities).length-1);

                                    // selectedCategory === group.gCatName
                                    selData.map((v, i) => {

                                      /////////소분류랑 대분류가 같을경우 해당 로컬스데이터 삭제
                                      if (
                                        v.gCapacity == capacity[0] &&
                                        v.gSubCatName == capacity[2]
                                      ) {
                                        // 1.데이터 지우기 :
                                        selData.splice(i, 1);

                                        // 2. 데이터 문자화하기 : 변경된 원본을 문자화
                                        let res = JSON.stringify(selData);

                                        // 3.로컬스 "cart-data"반영하기
                                        localStorage.setItem("wish-data", res);

                                        // 4. 카트리스트 전역상태변수 변경
                                        myCon.setLocalsWish(res);

                                      
                                        
                                        // 5. 강제리랜더링
                                        setForce(!force);

                                        // 6. 데이터개수가 0이면 위시리스트 상태변수 변경
                                        // 위시리스트 출력을 없앤다!
                                        if (selData.length == 0)
                                          myCon.setWishSts(false);
                                      }
                                    });
                                  } //// if /////
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  className="wish-xmark"
                                />
                              </div>
                            </SwiperSlide>
                          )}
                        </React.Fragment>
                      ))}
                    {/* /////////////////////////////////////////////////////// */}
                  </div>
                </Swiper>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 열기버튼이미지 박스 */}
      {sts && (
        <div
          id="mywish"
          className="mywishLogin"
          onClick={() => {
            // 왼쪽으로 이동하여 나타남!
            $("#wishlist").animate(
              {
                right: "0",
              },
              400
            );

            $("#mywish").removeClass("on");

            setForce(!force);
          }}
        >
          {/* 열기이미지 */}
          <FontAwesomeIcon icon={faHeart} className="fa-heart" />
        </div>
      )}
    </>
  );
}

export default CartList;
