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

  // useEffect(() => {
  //   const cont2 = mFn.qs(".cont2");

  //   const cont2Li = mFn.qsa(".cont2-li");
  //   cont2Li.forEach((ele) => {
  //     ele.onclick = () => {
  //       window.scrollTo(0, 0);
  //     };
  //   });

  //   if (!cont2) return;

  //   const handleScroll = () => {
  //     // 스크롤 등장 기준설정 : 화면의 2/3
  //     const CRITERIA = (window.innerHeight / 3) * 2;

  //     const bcrVal = cont2.getBoundingClientRect();

  //     if (bcrVal.top < CRITERIA) {
  //       cont2.style.top = "0rem";
  //       cont2.style.opacity = "1";
  //       cont2.style.transition = ".5s ease-out";

  //       window.removeEventListener("scroll", handleScroll);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
        <button className="more-btn sub-more-btn">
          <span>View All Colors</span>
        </button>
      </div>
    </section>
  );
}

export default SubVid;
