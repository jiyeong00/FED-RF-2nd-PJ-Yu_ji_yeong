// 서브페이지 - 특징 (두번째페이지)

import React from "react";

// 데이터 불러오기
import sub_point from "../data/sub/sub_point";

// css
import "../../css/sub_point.scss";

function SubPoint({ catName, subCatName }) {
  const key = subCatName;
  const selData = sub_point[catName].shinhan;
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
                    src={"/img/sub/oilShinhan_point_" + (i + 1) + ".jpg"}
                    alt={v.subTit}
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
