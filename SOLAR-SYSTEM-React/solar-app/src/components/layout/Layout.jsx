// 전체 레이아웃 컴포넌트 ///

import { useEffect, useState } from "react";
import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import TopArea from "./TopArea";
import { useNavigate } from "react-router-dom";
import { aCon } from "../modules/aCon";

export default function Layout() {
// 로그인관련//////////

  // [ 상태관리 변수 ] //////////////
  // 1. 로그인 상태관리변수
  const [loginSts, setLoginSts] = useState(sessionStorage.getItem("minfo"));
  // -> 초기값으로 세션스토리지 "minfo"를 할당함

  // 2. 로그인 환영 메시지 상태변수
  const [loginMsg, setLoginMsg] = useState(null);
  console.log(loginMsg);

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

  //// 코드 리턴구역 //////////////
  return (
    <aCon.Provider
      value={{
        loginSts,
        loginMsg,
        setLoginSts,
        setLoginMsg,
        goPage,
        makeMsg,
        logoutFn,
      }}
    >
      {/* 1.상단영역 */}
      <TopArea loginMsg={loginMsg} loginSts={loginSts} logoutFn={logoutFn} goPage={goPage}/>
      {/* 2.메인영역 */}
      <MainArea />
      {/* 3.하단영역 */}
      <FooterArea />
    </aCon.Provider>
  );
} /////////// Layout /////////////////////
