// 서브페이지 - 첫번째
import React from "react";

// 데이터 불러오기
import sub_data from "../data/sub/sub_data";

// css
import "../../css/sub_vid.scss";

function SubVid({ catName, subCatName }) {
  const selData = sub_data[catName];
  // console.log(selData);

  return (
    // <!-- 2-1. 서브 첫화면 -->
    <section className="sub1 sub-area part">
      {/* 배경 */}
      <div className="back-img" >
        {/* css에다가 넣음 */}
      </div>
      {/* 왼쪽 구역 */}
      <div className="left-area">
        {/* 왼쪽 설명 */}
        <div className="left-txt">
          <h2>신한 전문가 유화</h2>
          <p>
            신한 전문가 유화는 숙련된 개발자에 의해 컬러를 빚어내며 데이터
            기반의 과학적인 방법으로 다양한 테스트를 진행해 완벽한 품질을
            증명합니다. 아티스트의 입장에서 생각하고 고민하며 본질에 충실한 총
            109가지 컬러를 경험하세요.
          </p>
        </div>
        {/* 버튼 */}
        <button className="more-btn sub-more-btn">
          <span>View All Colors</span>
        </button>
      </div>
    </section>
  );
}

export default SubVid;
