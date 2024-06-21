// 서브페이지 - 첫번째
import React, { useEffect } from "react";

// 데이터 불러오기
import sub_data from "../data/sub/sub_data";

// css
import "../../css/sub_vid.scss";

function SubVid({ catName, subCatName }) {
  console.log(subCatName);
  let selSubCatName = Object.keys(sub_data[catName])[subCatName];
  const selData = sub_data[catName][selSubCatName];

  return (
    // <!-- 2-1. 서브 첫화면 -->
    <section className="sub1 sub-area part">
      <div
        className="sub1-wrap"
        style={{
          background:
            "url(/img/sub/" +
            catName +
            "_" +
            (subCatName + 1) +
            ".png) no-repeat 50% 50%",
        }}
      >
        {" "}
      </div>
      {/* 배경 */}
      <div className="back-img">{/* css에다가 넣음 */}</div>
      {/* 왼쪽 구역 */}
      <div className="left-area">
        {/* 왼쪽 설명 */}
        <div className="left-txt">
          <h2>{selData.tit}</h2>
          <p>{selData.txt}</p>
        </div>
        {/* 버튼 */}
        {selSubCatName != "kit" && (
          <button className="more-btn sub-more-btn" onClick={() => {}}>
            <span>View All Colors</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default SubVid;
