// 서브페이지 네번째 - 컬러

import React, { Fragment, useContext } from "react";

// css
import "../../css/sub_color.scss";
// 데이터 불러오기
import sub_color from "../data/sub/sub_color";

import { aCon } from "../modules/aCon";

function SubColor({ catName, subCatName }) {
  const myCon = useContext(aCon);
  // 할당배열랜덤수
  const cNum = myCon.rdmNum.current[catName][subCatName];

  const selData = sub_color;
  console.log("서브컬러:", catName);

  return (
    (catName !="KoreanColors" || subCatName != "2") && (
      // <!-- 2-4. 서브 네번째화면 -->
      <section className="sub4 sub-area">
        {/* 배경 */}
        <div className="sub4-title">
          <h2>COLOR CHART {cNum} colors</h2>
        </div>
        <ul className="cUlist">
          {selData.map((v, i) => (
            <Fragment key={i}>
              {i <= cNum && (
                <li>
                  <div
                    className="color-box"
                    style={
                      v.code == "#FFFFFF"
                        ? {
                            backgroundColor: v.code,
                            border: "1px solid #efefef",
                          }
                        : { backgroundColor: v.code }
                    }
                  ></div>
                  <p>{v.num}</p>
                  <p>{v.name}</p>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </section>
    )
  );
}

export default SubColor;
