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
  // 필터 검색어
  let orgData = selData;

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
  // 검색할려고 만든 변수
  const searchList = () => {
    if (keyword != "") {
      orgData = selData.filter((v) => {
        // 소문자 처리하기
        // (1) 검색원본데이터
        let orgTxt = v.name.toLowerCase();
        // (2) 검색어 데이터
        let txt = keyword.toLowerCase();

        // 필터검색조건 맞는 데이터 수집하기
        if (orgTxt.indexOf(txt) != -1) {
          console.log(orgTxt.indexOf(txt));
          return true;
        }
      }); ////filter
      console.log("필터 데이터",orgData.length,selData.length);
    }
    // 검색어가 없는 경우 전체 넣기
    else {
      orgData = selData;
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
                // console.log(txt);
                setKeyword(txt);

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
              {keyword == "" &&
                selData.map((v, i) => (
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
