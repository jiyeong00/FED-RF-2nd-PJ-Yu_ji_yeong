import React, { useContext, useEffect, useRef, useState } from "react";

import gnbData from "../data/main_gnb_data";
import { Link } from "react-router-dom";
import Logo from "../modules/Logo";

import mFn from "../func/my_function";
import { aCon } from "../modules/aCon";

function TopArea(props) {
  const myCon = useContext(aCon);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    const topArea = mFn.qs("#header-area");
    if (!topArea) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight * 3) / 4;
      let scrollLocation = document.documentElement.scrollTop;

      if (CRITERIA < scrollLocation) {
        topArea.style.backgroundColor = "white";
        topArea.style.transition = ".3s ease-out";
      } else if (CRITERIA > scrollLocation) {
        // console.log("나오나?");
        topArea.style.backgroundColor = "rgba(0, 0, 0, 0)";
        topArea.style.transition = ".3s ease-out";
      }
      // window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // width 값 실시간으로 가져오기
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header id="header-area">
      <header className="header-area inbox">
        {/* <!-- 로고 --> */}
        <h1 className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </h1>

        {/* <!-- 메뉴 --> */}

        <nav id="gnb">
          <ul>
            {/* 메뉴 리스트 */}
            <li>
              <ol>
                {gnbData["메뉴"].map((v, i) => (
                  <li key={i}>
                    <Link to={"/" + v}>{v}</Link>
                  </li>
                ))}
              </ol>
            </li>
            {/* 회원가입 리스트 */}
            {width > 1000 && (
              <li>
                <ol>
                  {/* {gnbData["회원가입"].map((v, i) => (
                    <li key={i}>
                      <a href="#">{v}</a>
                    </li>
                  ))} */}
                  {/* 회원가입, 로그인 버튼 */}
                  {
                    // 로그인 상태가 null일때 나옴
                    myCon.loginSts === null && (
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
                    myCon.loginSts !== null && (
                      <>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              myCon.logoutFn();
                            }}
                          >
                            LOGOUT
                          </a>
                        </li>
                      </>
                    )
                  }
                </ol>
              </li>
            )}
            {width <= 1000 && (
              <div className="topMenu-M">
                {/* 모바일 햄버거버튼 */}
                <div className="nav-img">
                  <img
                    src={process.env.PUBLIC_URL + "/img/menu_b.png"}
                    alt="메뉴버튼 이미지"
                  />
                </div>
                <li className="memberMenu">
                  <ol>
                    {gnbData["회원가입"].map((v, i) => (
                      <li key={i}>
                        <a href="#">{v}</a>
                      </li>
                    ))}
                  </ol>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </header>
  );
}

export default TopArea;
