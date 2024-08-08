// 상단영역 컴포넌트 ///
import React, { useEffect } from "react";
import Menu from "../modules/Menu.jsx";
import Searching from "../modules/Searching.jsx";

import { Link } from "react-router-dom";

// 데이터 불러오기
import { menu } from "../data/gnb";

//js불러오기
import topFn from "../func/top_area.js";

// 상단영역 CSS 불러오기
import "../../css/top_area.scss";
import "../../css/common/_core.scss";
import "../../css/common/_reset.scss";

// 제이쿼리
import $ from "jquery";

// 폰트어썸 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function TopArea({ loginSts, logoutFn, goPage }) {
  useEffect(() => {
    //상단공통함수
    topFn();
  }, []);

  // 검색 관련 함수들 ///////////
  // 1. 검색창 보이기함수
  const showSearch = (e) => {
    // 기본기능막기
    e.preventDefault();
    // 1. 검색창 보이기
    $(".searchingGnb").show();
    // show() - display를 보이게함
    // 2. 입력창에 포커스 보내기
    $("#schinGnb").focus();
  }; ////// showSearch 함수 ///////

  // 2. 검색창에 엔터키 누르면 검색함수 호출
  const enterKey = (e) => {
    // e.keyCode는 숫자, e.key문자로 리턴함
    // console.log(e.key,e.keyCode);
    if (e.key == "Enter") {
      // 입력창의 입력값 읽어오기 : val()사용
      let txt = $(e.target).val().trim();
      console.log(txt);
      // 빈값이 아니면 검색함수 호출(검색어전달!)
      if (txt != "") {
        // 입력창 비우고 부모박스 닫기
        $(e.target).val("").parent().hide();
        // 검색 보내기
        goSearch(txt);
      } /// if ///
    } //// if ////
  }; ///////// enterKey //////////

  // 3. 검색페이지로 검색어와 함께 이동하기함수
  const goSearch = (txt) => {
    console.log("나는 검색하러 간다규~!!!");
    // 라우터 이동함수로 이동하기
    // 네비게이트메서드(라우터주소,{state:{보낼객체}})
    goPage("search", { state: { keyword: txt } });
  }; /////////// goSearch //////////////

  //// 코드 리턴구역 //////////////

  return (
    <>
      <div id="header-area">
        <header className="header-area inbox">
          {/* <!-- 로고 --> */}
          <h1 className="logo">
            <a href="./" alt="나사 로고">
              <span className="ir">로고</span>
              <img src="./images/common/logo.png" alt="로고이미지" />
            </a>
          </h1>

          {/* <!-- 메뉴 --> */}
          <nav id="gnb">
            {/* 메뉴 컴포넌트 */}
            <Menu />
          </nav>

          {/* <!-- 기타 --> */}
          <div className="etc">
            {/* 로그인/회원가입 기능*/}
            <ul>
              {
                // 로그인 상태가 null일때 나옴
                loginSts === null && (
                  <>
                    <li>
                      <Link to="/member">JOIN US</Link>
                    </li>
                    <li>
                      <Link to="/login">LOGIN</Link>
                    </li>
                  </>
                )
              }
              {
                // 로그인 상태가 null이 아니면
                loginSts !== null && (
                  <>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logoutFn();
                        }}
                      >
                        LOGOUT
                      </a>
                    </li>
                  </>
                )
              }

              {/* 검색입력박스 */}
              <li className="searchingGnb">
                {/* 입력창 */}
                <input type="text" name="schinGnb" id="schinGnb" placeholder="Filter by Keyword" onKeyUp={enterKey} />
                {/* 검색버튼 돋보기 아이콘 */}
                <FontAwesomeIcon
                  icon={faSearch}
                  className="schbtnGnb"
                  title="Open search"
                  onClick={(e) => {
                    // 검색어 읽기
                    // let stxt = e.currentTarget.nextElementSibling.value;
                    let stxt = document.getElementById('schinGnb').value;
                   
                    if (stxt.trim() != "") {
                      // 검색하기
                      goSearch(stxt);
                    } else {
                      // 검색어 비었을때 메시지
                      alert("Please enter a search term!");
                    }
                  }}
                />
              </li>
            </ul>

            {/* <!-- 모바일 햄버거 버튼 --> */}
            <div className="mobile-btn">
              <div className="icon2">
                {/* 폰트어썸 사용 */}
                <FontAwesomeIcon icon={faBars} />
                <span className="ir">모바일 버튼</span>
              </div>
              <div className="icon3">
                {/* 폰트어썸 사용 */}
                <FontAwesomeIcon icon={faXmark} />
                <span className="ir">닫기 버튼</span>
              </div>
            </div>

            {/* <!-- 모바일 사이트맵 --> */}
            <div className="m-sitemap">
              <ol>
                {
                  // 로그인 상태가 null일때 나옴
                  loginSts === null && (
                    <>
                      <li>
                        <Link to="/member">JOIN US</Link>
                      </li>
                      <li>
                        <Link to="/login">LOGIN</Link>
                      </li>
                    </>
                  )
                }
                {
                  // 로그인 상태가 null이 아니면
                  loginSts !== null && (
                    <>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            logoutFn();
                          }}
                        >
                          LOGOUT
                        </a>
                      </li>
                    </>
                  )
                }
              </ol>

            

              {/* 메뉴 컴포넌트 */}
              <Menu />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default TopArea;
