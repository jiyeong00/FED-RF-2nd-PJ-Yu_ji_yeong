import React, { memo, useEffect, useState } from "react";

import gnbData from "../data/main_gnb_data";
import { Link } from "react-router-dom";
import Logo from "../modules/Logo";

import mFn from "../func/my_function";
import { openMenu, closeMenu } from "../func/top_area";

import $ from "jquery";

export const TopArea = memo((props) => {
  // const myCon = useContext(aCon);

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

  const [logoType, setLogoType] = useState("re");

  useEffect(() => {
    const topArea = mFn.qs(".header-area");
    if (!topArea) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = window.innerHeight / 3;
      const scrollLocation =
        window.scrollY || document.documentElement.scrollTop;

      const gnbOl = topArea.querySelectorAll(".gnb ul li ol a");

      if (scrollLocation > CRITERIA) {
        // 스크롤 내리면 te
        topArea.style.backgroundColor = "rgba(255, 255, 255, 1)";
        setLogoType("te");
        gnbOl.forEach((link) => {
          link.style.color = "black";
        });
      } else {
        topArea.style.backgroundColor = "rgba(0, 0, 0, 0)";
        setLogoType("re");
        gnbOl.forEach((link) => {
          link.style.color = "rgba(255, 255, 255, 0.6)";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header id="header-area">
        <header className="header-area">
          <div className="inbox">
            {/* <!-- 로고 --> */}
            <h1 className="logo" onClick={closeMenu}>
              <Link to="/">
                <Logo type={logoType} />
              </Link>
            </h1>

            {/* <!-- 메뉴 --> */}

            {width > 1000 && (
              <nav className="gnb">
                <ul>
                  {/* 메뉴 리스트 */}
                  <li>
                    <ol>
                      {gnbData["메뉴"].map((v, i) => (
                        <>
                          {/* 보드는 로그인일때만 나옴 */}
                          <Link to={"/" + v}>{v}</Link>
                        </>
                      ))}
                    </ol>
                  </li>
                  {/* 회원가입 리스트 */}
                  <li>
                    <ol>
                      {gnbData["sns"].map((v, i) => (
                        <li key={i}>
                          <img src={"/img/" + v + ".png"} alt={v + "이미지"} />
                        </li>
                      ))}
                    </ol>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </header>
      </header>
    </>
  );
});
