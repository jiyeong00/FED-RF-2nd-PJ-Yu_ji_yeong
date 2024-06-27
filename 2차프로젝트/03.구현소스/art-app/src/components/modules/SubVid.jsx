// 서브페이지 - 첫번째
import React, { useEffect, useState } from "react";

// 데이터 불러오기
import sub_data from "../data/sub/sub_data";

// css
import "../../css/sub_vid.scss";

function SubVid({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_data[catName])[subCatName];
  const selData = sub_data[catName][selSubCatName];
  console.log("dd", selSubCatName, selData, catName);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  // width 값 실시간으로 가져오기
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // <SubPoint/>
    // <!-- 2-1. 서브 첫화면 -->
    <section className="sub1 part">
      {width > 800 && (
        <div
          className="sub1-wrap"
          style={{
            background:
            "url("+process.env.PUBLIC_URL+"/img/sub/" +
              catName +
              "_" +
              (subCatName + 1) +
              ".png) no-repeat 50% 50%",
          }}
        ></div>
      )}
      {width <= 800 && (
        <div
          className="sub1-wrap"
          style={{
            background:
              "url("+process.env.PUBLIC_URL+"/img/sub/M_" +
              catName +
              "_" +
              (subCatName + 1) +
              ".png) no-repeat 50% 50%",
          }}
        ></div>
      )}
      {/* 배경 */}
      <div className="back-img">{/* css에다가 넣음 */}</div>
      {/* 왼쪽 구역 */}
      <div className="left-area">
        {/* 왼쪽 설명 */}
        <div
          className="left-txt"
          style={
            catName == "OilColors"
              ? selSubCatName == "SH"
                ? { color: "white" }
                : { color: "black" }
              : catName == "KoreanColors"
              ? selSubCatName == "SH"
                ? { color: "white" }
                : { color: "black" }
              : catName == "Gouache"
              ? selSubCatName == "shinhan"
                ? { color: "white" }
                : { color: "black" }
              : catName == "PosterColors"
              ? selSubCatName == "shinhan_tube"
                ? { color: "white" }
                : selSubCatName == "SH"
                ? { color: "white" }
                : { color: "black" }
              : { color: "black" }
          }
        >
          <h2 className="core-h2">{selData.tit}</h2>
          <p>{selData.txt}</p>
        </div>
        {/* 버튼 */}
        {selSubCatName != "kit" && (
          <button
            className="more-btn sub-more-btn"
            style={
              catName == "PosterColors" && selSubCatName == "SH"
                ? { borderColor: "white" }
                : {}
            }
            onClick={() => {
              console.log("dsdsdsdsd");
              // <SubSets catName={catName} subCatName={selSubCatName}/>
            }}
          >
            <span
              style={
                catName == "PosterColors" && selSubCatName == "SH"
                  ? { color: "white" }
                  : {}
              }
            >
              View All Colors
            </span>
          </button>
        )}
      </div>
      {/* 네비게이션 경로 */}
      <nav className="nav">
        <p>
          <i className="fa-solid fa-house-chimney"></i>
        </p>
        <p>
          <i className="fa-solid fa-chevron-right"></i>
        </p>
        <p>{catName}</p>
        <p>
          <i className="fa-solid fa-chevron-right"></i>
        </p>
        <p>{selData.stit}</p>
      </nav>
    </section>
  );
}

export default SubVid;
