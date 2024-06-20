import React, { useLayoutEffect, useRef } from "react";
import TopArea from "./TopArea";
import MainArea from "./MainArea";
import FooterArea from "./FooterArea";
import { aCon } from "../modules/aCon";

import mFn from "../func/my_function";

function Layout(props) {
  const rdmNum = useRef({
    OilColors: [1, 1],
    KoreanColors: [1, 1, 1],
    Gouache: [1, 1],
    PosterColors: [1, 1, 1, 1],
  });

  // const mCatSet = useRef("");

  useLayoutEffect(() => {
    let keyArr = Object.keys(rdmNum.current);
    // console.log("키배열:",keyArr);
    keyArr.forEach((v) => {
      // console.log(rdmNum.current[v]);
      rdmNum.current[v] = rdmNum.current[v].map((v) =>
        Math.floor(Math.random() * 29 + 30)
      );
    });
    // 매뉴 클릭하면 맨 위 화면으로
    const gnb = mFn.qsa("#gnb ol li");
    gnb.forEach((ele) => {
      ele.onclick = () => {
        window.scrollTo(0, 0);
      };
    });
    // console.log("최초랜덤:",rdmNum.current);
  }, []);
  useLayoutEffect(() => {
    //  console.log(rdmNum.current);
  });

  //// 코드 리턴구역 //////////////
  return (
    // <aCon.Provider value={{rdmNum,mCatSet}}>
    <aCon.Provider value={{ rdmNum }}>
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
