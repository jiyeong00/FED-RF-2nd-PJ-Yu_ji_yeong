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
        {/* {selData.map((v, i) => {
          // selData에서 각 요소의 gCatName 값을 key로 해서 그룹화
          const groupItem = selData.filter(
            (item) => item.gCatName === v.gCatName
          );

          console.log("그룹!!",groupItem);

          return (
            <React.Fragment key={i}>
              <div className="wish-sub-tit">
                <strong>{gCatName!=v.gCatName && v.gCatName}</strong>
              </div>
              <div className="wish-sub-txt">
                {groupItem.map((item, index) => (
                  <React.Fragment key={item.idx}>
                    {index > 0 && ", "}
                    {item.gCapacity}
                  </React.Fragment>
                ))} */}
        {selData
          .reduce((acc, v, i, arr) => {
            // 이전 요소와 현재 요소의 gCatName이 다를 경우에만 새로운 그룹 추가
            if (i === 0 || v.gCatName !== arr[i - 1].gCatName) {
              acc.push({
                gCatName: v.gCatName,
                gCapacities: [v.gCapacity],
              });
            } else {
              // 이전 요소와 현재 요소의 gCatName이 같을 경우, 기존 그룹에 gCapacity 추가
              acc[acc.length - 1].gCapacities.push(v.gCapacity);
            }
            return acc;
          }, [])
          .map((group, i) => (
            <React.Fragment key={i}>
              <div className="wish-sub-tit">
                <strong>{group.gCatName}</strong>
              </div>
              <div className="wish-sub-txt">
                {group.gCapacities.map((capacity, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && " "}
                    {capacity}
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
        {/* {selData.map((v, i) => {
          // selData에서 각 요소(v)의 gCatName 값을 key로 하여 그룹화
          const groupedItems = selData.filter(
            (item) => item.gCatName === v.gCatName
          );

          // 해당 그룹의 모든 데이터를 가져와서 문자열로 합침
          const combinedText = groupedItems.map((item) => (
            <div key={item.idx}>{JSON.stringify(item[item.gCatName])}</div>
          ));
          // console.log(groupedItems,combinedText);

          // <h1>제목</h1>
          <>
            <div className="wish-sub-tit" key={i}>
              <strong>{v.gCatName}</strong>
              <strong>제목</strong>
            </div>
            <div className="wish-sub-txt">
              {combinedText}
              내용
            </div>
          </>;
        })} */}
      </div>
    </section>
  );
}

export default CartList;
