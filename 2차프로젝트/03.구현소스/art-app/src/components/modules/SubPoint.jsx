// 서브페이지 - 특징 (두번째페이지)

import React from "react";

// 데이터 불러오기
import sub_point from "../data/sub/sub_point";

// css
import "../../css/sub_point.scss";

function SubPoint({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_point[catName])[subCatName];
  const selData = sub_point[catName][selSubCatName];
  // const selData = sub_point[catName].shinhan;
//   console.log(key, selData);
  return (
    // <!-- 2-2. 서브 두번째화면 -->
    <section className="sub2 sub-area">
      {/* 배경 */}
      <div className="sub2-title">
        <img src={"/img/OilColor_title_logo.png"} alt="오일컬러" />
      </div>
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
                    src={"/img/sub/"+catName+"_"+selSubCatName+"_point_" + (i + 1) + ".jpg"}
                    alt={v.subTit+" 이미지"}
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
