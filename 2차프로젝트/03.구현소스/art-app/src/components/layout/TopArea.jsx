import React, { useContext, useEffect } from "react";

import gnbData from "../data/main_gnb_data";
import { Link } from "react-router-dom";
import Logo from "../modules/Logo";
import { aCon } from "../modules/aCon";

import mFn from "../func/my_function";

function TopArea(props) {

  useEffect(() => {
    const topArea = mFn.qs("#header-area");

    const topGnb = mFn.qsa("#gnb ul li a");
    const logo = mFn.qs(".logo");

      topGnb.forEach((ele) => {
        // ele를 클릭했을때 topGnb에 on추가
        ele.onclick = () => {
          topGnb.forEach((item) => {
            item.classList.remove("on");
          });
          ele.classList.add("on");
        };
        // 로고 클릭해도 on지우기
        logo.onclick = () => {
          topGnb.forEach((item) => {
            item.classList.remove("on");
          });
        };
      }); /////////////////////forEach


    if (!topArea) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = window.innerHeight;
      let scrollLocation = document.documentElement.scrollTop;

      const bcrVal = topArea.getBoundingClientRect();
      // console.log("dddd",CRITERIA,"sssss",scrollLocation);

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
            <li>
              <ol>
                {gnbData["메뉴"].map((v, i) => (
                  // <li key={i} onClick={(e)=>{
                  //   chgMenu(e.currentTarget.querySelector("a").innerText);
                  // }}>
                  <li key={i}>
                    {/* <a href="Oil Colors.jsx">{v}</a> */}
                    <Link to={"/" + v}>
                      {v}
                    </Link>
                  </li>
                ))}
              </ol>
            </li>
            <li>
              <ol>
                {gnbData["회원가입"].map((v, i) => (
                  <li key={i}>
                    <a href="#">{v}</a>
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        </nav>
      </header>
    </header>
  );
}

export default TopArea;
