import React, { useContext, useEffect, useState } from "react";

// 제이쿼리
import $ from "jquery";

// css
import "../../css/cart_list.scss";

import { aCon } from "./aCon";

// 데이터
import sub_sets from "../data/sub/sub_sets";

function CartList() {
  // let selSubCatName = Object.keys(sub_sets[catName])[subCatName];
  // 컨텍스트 사용
  const myCon = useContext(aCon);

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(myCon.localsCart);
  console.log("로컬스:", selData);

  return (
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
        <span>닫기버튼</span>
      </a>

      {/*  제목 */}
      <h1> 위시 리스트</h1>
      {/* 내용 */}
      <div className="wish-list-txt">
        {selData.map((v, i) => (
          <React.Fragment>
            <div className="wish-sub-tit">
              <strong>OilColors</strong>
              <div className="wish-sub-txt">
                {v.gCatName == "OilColors" && v.gCapacity}
              </div>
            </div>
            <div className="wish-sub-tit">
              <strong>KoreanColors</strong>
              <div className="wish-sub-txt">
                {v.gCatName == "KoreanColors" && v.gCapacity}
              </div>
            </div>
            <div className="wish-sub-tit">
              <strong>Gouache</strong>
              <div className="wish-sub-txt">
                {v.gCatName == "Gouache" && v.gCapacity}
              </div>
            </div>
            <div className="wish-sub-tit">
              <strong>PosterColor</strong>
              <div className="wish-sub-txt">
                {v.gCatName == "PosterColor" && v.gCapacity}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default CartList;
