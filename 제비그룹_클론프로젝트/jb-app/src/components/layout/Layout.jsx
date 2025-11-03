import React, { useCallback, useLayoutEffect, useRef } from "react";
import { TopArea } from "./TopArea";
import MainArea from "./MainArea";
import { FooterArea } from "./FooterArea";
import { aCon } from "../modules/aCon";

import mFn from "../func/my_function";
import { useNavigate } from "react-router-dom";

function Layout(props) {
  // const mCatSet = useRef("");


  //// 코드 리턴구역 //////////////
  return (
    // <aCon.Provider value={{rdmNum,mCatSet}}>
    <aCon.Provider>
      {/* 1.상단영역 */}
      <TopArea />
      {/* 2.메인영역 */}
      <MainArea />
      {/* 3.하단영역 */}
      <FooterArea />
    </aCon.Provider>
  );
}

export default Layout;
