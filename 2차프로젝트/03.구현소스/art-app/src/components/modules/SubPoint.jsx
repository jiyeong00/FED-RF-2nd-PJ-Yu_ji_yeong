// 서브페이지 - 특징 (두번째페이지)

import React, { useEffect } from "react";

// 데이터 불러오기
import sub_point from "../data/sub/sub_point";

// css
import "../../css/sub_point.scss";
import mFn from "../func/my_function";

function SubPoint({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_point[catName])[subCatName];
  const selData = sub_point[catName][selSubCatName];
  // const selData = sub_point[catName].shinhan;

  useEffect(() => {
    const sub2 = mFn.qs(".sub2");

    if (!sub2) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;

      const bcrVal = sub2.getBoundingClientRect();

      if (bcrVal.top < CRITERIA) {
        sub2.style.top = "0rem";
        sub2.style.opacity = "1";
        sub2.style.transition = ".5s ease-out";

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    // <!-- 2-2. 서브 두번째화면 -->
    <section className="sub2 sub-area">
      {selSubCatName != "kit" && (
        <>
          {/* 배경 */}
          <div className="sub2-title">
            {selSubCatName != "SH" ? (
              <img
                src={
                  "/img/brand/" + catName + "_" + selSubCatName + "_brand.png"
                }
                alt={selSubCatName}
              />
            ) : (
              <img
                src={"/img/brand/" + selSubCatName + "_brand.png"}
                alt={selSubCatName}
              />
            )}
          </div>
        </>
      )}
      <ul>
        {selData.map((v, i) => (
          <li key={i} className="plist">
            <div className="pdiv">
              <div className="sub2-txt">
                <div className="sub2-txt-wrap">
                  <h3>{v.subTit}</h3>
                  <p>{v.subTxt}</p>
                </div>
              </div>
              <div className="sub2-img-box">
                <img
                  src={
                    "/img/sub/" +
                    catName +
                    "_" +
                    selSubCatName +
                    "_point_" +
                    (i + 1) +
                    ".jpg"
                  }
                  alt={v.subTit + " 이미지"}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SubPoint;
