import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    let keyArr = Object.keys(rdmNum.current);
    // console.log("키배열:",keyArr);
    keyArr.forEach((v) => {
      // console.log(rdmNum.current[v]);
      rdmNum.current[v] = rdmNum.current[v].map((v) =>
        Math.floor(Math.random() * 29 + 30)
      );
    });

    // 매뉴 클릭하면 맨 위 화면으로
    const gnb = mFn.qsa(".gnb ol li");
    gnb.forEach((ele) => {
      ele.onclick = () => {
        window.scrollTo(0, 0);
      };
    });
    // console.log("최초랜덤:",rdmNum.current);
  }, []); //////////랜덤컬러 useLayoutEffect

  /////////////////////////////////////////////////////////////////////////
  // 로그인관련//////////

  // [ 상태관리 변수 ] //////////////
  // 1. 로그인 상태관리변수
  const [loginSts, setLoginSts] = useState(sessionStorage.getItem("minfo"));
  // -> 초기값으로 세션스토리지 "minfo"를 할당함

  // 2. 로그인 환영 메시지 상태변수
  const [loginMsg, setLoginMsg] = useState(null);

  // [ 공통 함수 ] ///
  // 1. 라우팅 이동함수
  const goPage = useNavigate();
  // 2. 로그인 환영메시지 생성함수
  const makeMsg = (name) => {
    // 유저아이콘
    let usrIcon = ["🙍‍♂️", "🧏‍♀️", "🦸‍♂", "👨‍🎤", "🦸‍♀"];
    // 랜덤수 : 0~4사이의 수
    let rdm = Math.floor(Math.random() * 5);
    // 로그인 메시지 상태변수 업데이트
    setLoginMsg(`Welcome ${name} ${usrIcon[rdm]}`);
  };

  //3. 로그아웃 함수
  const logoutFn = () => {
    // 1. 로그인 상태값 null
    setLoginSts(null);

    // 2. 세션스 지우기
    sessionStorage.removeItem("minfo");
    // 3. 로그인 메시지 초기화
    setLoginMsg(null);
    // 4. 메인페이지로 돌아가기
    goPage("/");
  }; //////////logoutFn

  // 화면 랜더링 구역
  // -> 로그인 상태 체크
  useEffect(() => {
    if (sessionStorage.getItem("minfo")) {
      let ss = sessionStorage.getItem("minfo");
      // 로그인상태값
      setLoginSts(ss);
      // 로그인 메시지 업데이트
      makeMsg(JSON.parse(ss).unm);
    }
  }, []);

  ///////////////////////////////쇼핑카트!!

  // 로컬스 카트 존재여부변수
  let cartTemp = false;

  // 로컬스 카트 데이터 상태변수
  const [localsCart, setLocalsCart] = useState(
    localStorage.getItem("cart-data")
  );

  // 로컬스 카트 데이터 존재여부에 따라 상태값 변경
  if (localsCart) {
    // 데이터가 있으면 cartTemp값 true로 변경
    // 데이터 개수가 0이 아니어야함!
    let cartCnt = JSON.parse(localsCart).length;
    console.log("카트 데이터수:", cartCnt);
    if (cartCnt > 0) cartTemp = true;
  } //////////// 카트존재여부 if ////////

  // 1. 페이지변경 상태변수
  // const [pgName, setPgName] = useState("main");
  // 2. 카트리스트 사용여부 : true 일때 사용
  const [cartSts, setCartSts] = useState(cartTemp);
  console.log(loginMsg);

  //// 코드 리턴구역 //////////////
  return (
    // <aCon.Provider value={{rdmNum,mCatSet}}>
    <aCon.Provider
      value={{
        rdmNum,
        loginSts,
        loginMsg,
        setLoginSts,
        setLoginMsg,
        goPage,
        makeMsg,
        logoutFn,
        setCartSts,
        setLocalsCart,
        localsCart,
      }}
    >
      {/* 1.상단영역 */}
      <TopArea
        loginMsg={loginMsg}
        loginSts={loginSts}
        logoutFn={logoutFn}
        goPage={goPage}
      />
      {/* 2.메인영역 */}
      <MainArea />
      {/* 3.하단영역 */}
      <FooterArea />
    </aCon.Provider>
  );
}

export default Layout;
