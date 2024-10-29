import React, { useEffect, useState } from "react";

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark,faBars } from "@fortawesome/free-solid-svg-icons";

import mFn from "../func/my_function";

//메뉴데이터
// import menuData from "../data/menu_data";

function TopArea(props) {


  return (
    <header id="header-area">
      <header className="header-area">
        <a href="#">portfolio</a>
          <nav className="gnb">
            <ul>

            </ul>
          </nav>

      </header>
    </header>
  );
}

export default TopArea;
