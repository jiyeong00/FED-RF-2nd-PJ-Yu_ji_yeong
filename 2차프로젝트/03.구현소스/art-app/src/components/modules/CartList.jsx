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

  return (
    <section id="wishlist">
      {/* 닫기 */}
      <a
        href="#"
        className="cbtn cbtn2"
        onClick={(e) => {
          e.preventDefault();
          // 오른쪽으로 이동하여 사라짐
          // $("#wishlist").animate(
          //   {
          //     right: "-60vw",
          //   },
          //   400
          // );
        }}
      >
        <span>닫기버튼</span>
      </a>

      {/*  제목 */}
      <h1> 위시 리스트</h1>
      {/* 내용 */}
      <div className="wish-list-txt">
        {selData.map((v, i) => {
          // selData에서 각 요소(v)의 gCatName 값을 key로 하여 그룹화
          const groupedItems = selData.filter(
            (item) => item.gCatName === v.gCatName
          );

          // 해당 그룹의 모든 v[v.gCatName][v.gSubCatName] 값을 가져와서 문자열로 합침
          // const combinedText = groupedItems
          //   .map((item) =>
          //     JSON.stringify(item[item.gCatName][item.gSubCatName])
          //   )
          //   .join(", ");
          console.log(groupedItems);

          <>
            <div className="wish-sub-tit" key={i}>
              <strong>{v.gCatName}</strong>
            </div>
            <div className="wish-sub-txt">{}</div>
          </>;
        })}
      </div>
    </section>
  );
}

export default CartList;
