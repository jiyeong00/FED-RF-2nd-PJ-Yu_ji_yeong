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

  // 원본/.///////////
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
  //     </Fragment>
  // ));

  // 로컬스토리지 만들고
  localStorage.setItem("search-data", JSON.stringify(selData));

  // 데이터 가져와서 변수할당
  const searchData = JSON.parse(localStorage.getItem("search-data"));

  const thisData = [];
  selData.some((v, i) => {
    if (i > cNum) return true; // 조건이 true이면 some을 중지하고 반복을 멈춘다.

    thisData.push(
      <Fragment key={i}>
        <li>
          <div
            className="color-box"
            style={
              v.code === "#FFFFFF"
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
      </Fragment>
    );
    return false; // 조건이 false이면 계속 반복.
  });

  // 필터 검색어
  let orgData;
  // 검색할려고 만든 변수
  const searchList = () => {
    // 필터 먹여!
    const filterData = searchData.filter((item) => item.idx <= cNum);

    //   if (keyword!= "") {
    //     orgData = filterData.filter((v) => {
    //       // console.log(v,v.name);
    //       // 소문자 처리하기
    //       // (1) 검색원본데이터
    //       let orgTxt = v.name.toLowerCase();
    //       // (2) 검색어 데이터
    //       let txt = keyword.toLowerCase();

    //       console.log("키워드",keyword,orgTxt,txt);

    //       // 필터검색조건 맞는 데이터 수집하기
    //       if (orgTxt.indexOf(txt) != -1) {
    //         // console.log(orgTxt.indexOf(txt));
    //         return true;
    //       }
    //       // console.log("필터 데이터",thisData2);
    //     }); ////filter
    //     console.log("필터 데이터", orgData);
    //   }
    //   // 검색어가 없는 경우 전체 넣기
    //   else {
    //     orgData = thisData;
    //     console.log("검색어 없음");
    //   }
    // };

    if (keyword.trim() !== "") {
      // keyword를 소문자로 변환
      const lowerKeyword = keyword.toLowerCase();

      // filterData를 keyword로 필터링
      orgData = filterData.filter((item) => {
        // item.name을 소문자로 변환
        const lowerName = item.name.toLowerCase();
        // keyword가 name에 포함되어 있는지 확인
        return lowerName.includes(lowerKeyword);
      });

      console.log("필터된 데이터", orgData);

      thisData = orgData;
    } else {
      // keyword가 없으면 전체 데이터
      orgData = filterData;
      console.log("검색어 없음, 전체 데이터", orgData);
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

                searchList();
                console.log(thisData.length, orgData.length);
              }}
            >
              검색
            </button>
          </div>
          <ul className="cUlist">
            <>
              {keyword != "" && thisData}
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
