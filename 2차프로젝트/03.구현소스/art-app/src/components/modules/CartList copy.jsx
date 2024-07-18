import React, { useContext, useEffect, useState } from "react";

// 제이쿼리
import $ from "jquery";

// css
import "../../css/cart_list.scss";

import { aCon } from "./aCon";

// 데이터
import sub_sets from "../data/sub/sub_sets";
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

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(myCon.localsCart);
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
        acc[i.gCatName].gCapacities.push([i.gCapacity, i.idx, i.gSubCatName]);
        // acc[i.gCatName].gCapacities.push([i.gCapacity,i.idx,i.gSubCatName]);
      } else {
        // 같으면 이미 있는 그룹에 추가
        acc[i.gCatName].gCapacities.push([i.gCapacity, i.idx, i.gSubCatName]);
      }

      return acc;
    }, {});

    let res = JSON.stringify(selData);
    // 3.로컬스 "wish-data"반영하기
    localStorage.setItem("wish-data", res);

    // 4. 카트리스트 전역상태변수 변경
    myCon.setLocalsCart(res);

    // 객체를 배열로 변환합니다.
    const groupsArray = Object.values(groupedData);
    // console.log("그룹 어레이",groupsArray);
    setGroups(groupsArray);
  };

  const handleCatClick = (category) => {
    // 선택된 대분류를 업데이트.
    // 소분류 추가
    setSelCategory(category);
  };


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
          }}
        >
          <FontAwesomeIcon icon={faXmark} className="fa-xmark" />
          <span>닫기버튼</span>
        </a>

        {/*  제목 */}
        <h1> 위시 리스트</h1>
        {/* 내용 */}
        <div className="wish-list-txt">
          <div>
            {groups.map((group, index) => (
              <div key={index}>
                <div className="wish-sub-tit">
                  <strong
                    onClick={() => {
                      handleCatClick(group.gCatName);
                    }}
                  >
                    {/* {console.log("순번?", group)} */}
                    {group.gCatName}
                  </strong>
                </div>
                <div className="wish-sub-txt-wrap no_scroll">
                  {/* 선택된 대분류의 소분류들만 출력함. */}
                  
                  {/* /////////////////////////////////////////////////////// */}
                  {selectedCategory === group.gCatName &&
                    group.gCapacities.map((capacity, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && (
                          <div className="wish-sub-txt">
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
                              alt={capacity}
                            />
                            {capacity[0]}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                    {/* /////////////////////////////////////////////////////// */}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 열기버튼이미지 박스 */}
      <div
        id="mywish"
        onClick={() => {
          // 왼쪽으로 이동하여 나타남!
          $("#wishlist").animate(
            {
              right: "0",
            },
            400
          );
          setForce(!force);
        }}
      >
        {/* 열기이미지 */}
        <FontAwesomeIcon icon={faHeart} className="fa-heart" />
        {/* 카트상품개수 출력박스 */}
        {/* <div className="cntBx">{dataCnt}</div> */}
      </div>
    </>
  );
}

export default CartList;
