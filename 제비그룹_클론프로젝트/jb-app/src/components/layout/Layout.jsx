import React, {
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { TopArea } from "./TopArea";
import MainArea from "./MainArea";
import { FooterArea } from "./FooterArea";
import { aCon } from "../modules/aCon";

import mFn from "../func/my_function";
import { useNavigate } from "react-router-dom";

function Layout(props) {
  const rdmNum = useRef({
    OilColors: [1, 1],
    KoreanColors: [1, 1, 1],
    Gouache: [1, 1],
    PosterColors: [1, 1, 1, 1],
  });

  // const mCatSet = useRef("");

  useLayoutEffect(() => {

    // 매뉴 클릭하면 맨 위 화면으로
    const gnb = mFn.qsa(".gnb ol li");
    gnb.forEach((ele) => {
      ele.onclick = () => {
        window.scrollTo(0, 0);
      };
    });
    // console.log("최초랜덤:",rdmNum.current);
  }, []); //////////랜덤컬러 useLayoutEffect




  

  // [ 공통 함수 ] ///
  // 1. 라우팅 이동함수 :  : 라우터 이동후크인 useNavigate는
  // 다른 useCallback() 후크로 처리할 수 없다!
  const goNav = useNavigate();
  const goPage = useCallback((pm1, pm2) => {
    goNav(pm1, pm2);
  }, []);
  // 2. 로그인 환영메시지 생성함수
  const makeMsg = (name) => {
  };



  //// 코드 리턴구역 //////////////
  return (
    // <aCon.Provider value={{rdmNum,mCatSet}}>
    <aCon.Provider
      value={{
        rdmNum,
        goPage,
        makeMsg,
      }}
    >
      {/* 1.상단영역 */}
      {/* <TopArea /> */}
      {/* 2.메인영역 */}
      <MainArea goPage={goPage} />
      {/* 3.하단영역 */}
      <FooterArea />
    </aCon.Provider>
  );
}

export default Layout;
