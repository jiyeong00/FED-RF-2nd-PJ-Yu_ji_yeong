import React, { useContext, useEffect } from "react";

import gnbData from "../data/main_gnb_data";
import { Link } from "react-router-dom";
import Logo from "../modules/Logo";
import { aCon } from '../modules/aCon';


function TopArea(props) {
  const myCon = useContext(aCon);

  const chgMenu = (txt)=>{
    myCon.mCatSet.current = txt;
    console.log(myCon.mCatSet.current);

  };



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
                  <li key={i} onClick={(e)=>{
                    chgMenu(e.currentTarget.querySelector("a").innerText);
                  }}>
                    {/* <a href="Oil Colors.jsx">{v}</a> */}
                    <Link to={"/" + v}>{v}</Link>
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
