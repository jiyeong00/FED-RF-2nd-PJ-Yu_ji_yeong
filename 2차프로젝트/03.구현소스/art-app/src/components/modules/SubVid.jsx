// 서브페이지 - 첫번째
import React from "react";

// 데이터 불러오기
import sub_data from "../data/sub/sub_data";

function SubVid({ catName, subCatName }) {
  const selData = sub_data[catName].subCatName;
  console.log(selData);

  return (
    // <!-- 2-1. 컨텐츠 첫화면 -->
    <section className="sub1 sub-area">
      {/* 배경 */}
      <div className="back-img">
        <img src={"/img/sub/OilColor_1.png"} alt="오일컬러" />
      </div>
      {/* 왼쪽 구역 */}
      <div className="left-area">
        {/* 왼쪽 설명 */}
        <div className="left-txt">
          {/* <h2>{selData.tit}</h2> */}
          {/* <p>{selData.txt}</p> */}
        </div>
        {/* 버튼 */}
        <button className="more-btn">
          <span>View All Colors</span>
        </button>
      </div>
    </section>
  );
}

export default SubVid;
