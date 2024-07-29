// 서브페이지 네번째 - 컬러

import React, { Fragment, useContext, useEffect, useState } from "react";

// css
import "../../css/sub_color.scss";
// 데이터 불러오기
import sub_color from "../data/sub/sub_color";

import { aCon } from "../modules/aCon";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// 제이쿼리
import $ from "jquery";

function SubColor({ catName, subCatName }) {
  const myCon = useContext(aCon);
  // 할당배열랜덤수
  const cNum = myCon.rdmNum.current[catName][subCatName];

  const selData = sub_color;

  const [showButton, setShowButton] = useState(false);
  // 검색어 저장변수
  const [keyword, setKeyword] = useState("");

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  ////////////////////////////////////////////////////////////////////

  // const thisData = selData.map((v, i) => (
  //   <Fragment key={i}>
  //     {i <= cNum && (
  //       <li>
  //         <div
  //           className="color-box"
  //           style={
  //             v.code == "#FFFFFF"
  //               ? {
  //                   backgroundColor: v.code,
  //                   border: "1px solid #efefef",
  //                 }
  //               : { backgroundColor: v.code }
  //           }
  //         ></div>
  //         <p>{v.num}</p>
  //         <p>{v.name}</p>
  //       </li>
  //     )}
  //     {
  //       i>cNum && ''
  //     }
  //     </Fragment>
  // ));

  const thisData = [];
  let thisData2=[];
  // 배열의 요소를 순회하면서 필요한 조건에 따라 처리
  for (let i = 0; i < selData.length; i++) {
    if (i > cNum) {
      break; // cNum을 초과하면 반복 종료
    }
    thisData2[i]=selData[i];
    thisData.push(
      <li key={i}>
        <div
          className="color-box"
          style={
            thisData2.code === "#FFFFFF"
              ? {
                  backgroundColor: thisData2.code,
                  border: "1px solid #efefef",
                }
              : { backgroundColor: thisData2.code }
          }
        ></div>
        <p>{thisData2.num}</p>
        <p>{thisData2.name}</p>
      </li>
    );
    // console.log(thisData2);
  }

  // 필터 검색어
  let orgData;
  // 검색할려고 만든 변수
  const searchList = () => {
    if (keyword != "") {
      orgData = thisData2.filter((v) => {
        // console.log(v,v.name);
        // 소문자 처리하기
        // (1) 검색원본데이터
        let orgTxt = v.name;
        // (2) 검색어 데이터
        let txt = keyword;

        // 필터검색조건 맞는 데이터 수집하기
        if (orgTxt.indexOf(txt) != -1) {
          console.log(orgTxt.indexOf(txt));
          return true;
        }
        // console.log("필터 데이터",thisData2);
      }); ////filter
      console.log("필터 데이터",orgData);
    }
    // 검색어가 없는 경우 전체 넣기
    else {
      orgData = thisData2;
    }
  };

  return (
    <section>
      {(catName != "KoreanColors" || subCatName != "2") && (
        // {/* <!-- 2-4. 서브 네번째화면 --> */}
        <div className="sub4 sub-area">
          {/* 배경 */}
          <div className="sub4-title">
            <h2>COLOR CHART {cNum + 1} colors</h2>
          </div>
          <div className="subSearch-area">
            <input id="stxt" type="text" />
            <button
              className="search-btn"
              onClick={(e) => {
                // 검색어 읽어오기
                let txt = $(e.target).prev().val();
                setKeyword(txt);

                console.log(thisData2);

                searchList();
              }}
            >
              검색
            </button>
          </div>
          <ul className="cUlist">
            <>
              {/* {keyword != "" &&
                orgData.map((v, i) => {
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
                  </Fragment>;
                })} */}
              {keyword == "" && thisData}
            </>
          </ul>
        </div>
      )}

      <div className="topBtn-area">
        <button className="top" onClick={scrollToTop} type="button">
          <span>Top</span>
        </button>
      </div>
    </section>
  );
}

export default SubColor;
