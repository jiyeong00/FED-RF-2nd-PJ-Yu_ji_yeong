import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 공통 CSS 불러오기
import "./css/index.scss";
// 컴포넌트 불러오기
import Main from "./components/pages/Main";
import OilColors from "./components/pages/OilColors";
import KoreanColors from "./components/pages/KoreanColors";
import PosterColors from "./components/pages/PosterColors";
import Gouache from "./components/pages/Gouache";
import SubPage from "./components/pages/SubPage";

export default function MainComponent() {
  return (
    // 라우터 루트로 라우터 구성시작
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* 중요!!! 레이아웃 컴포넌트를 루트로 설정!
        루트 Route 는 홀로닫지말고 반드시 다른
        하위 라우트를 감싸도록한다!!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우트 셋팅 
        -> path설정대신 index키워드를 쓰면 
        첫페이지로 구성됨 -> MainArea 컴포넌트 <Outlet/>에
        출력된다!*/}
          <Route index element={<Main />} />
          <Route path="Oil Colors" element={<OilColors />} />
          <Route path="Korean Colors" element={<KoreanColors my="aa" />} />
          <Route path="Gouache" element={<Gouache />} />
          <Route path="Poster Colors" element={<PosterColors />} />
          <Route path="subPage" element={<SubPage />} />
          {/* <Route path="comics" element={<Comics />} /> */}
        </Route>
        {/* Layout 루트 Route로 하위 Route를 감싼다! */}
      </Routes>
    </BrowserRouter>
  );
}

/******************************************* 
  컴포넌트로 만들고 라우터 안에 넣고
  라우터 경로변경시 스크롤 최상단이동
*******************************************/
const ScrollTop = () => {
  // 라우터 경로 변경시 path 값 읽어오기
  // pathname 객체 속성에 담긴다!
  const { pathname } = useLocation();

  // 화면랜더링 구역에 스크롤상단이동 코드넣기
  useEffect(() => {
    // 스크롤 최상단 이동
    window.scrollTo(0, 0);
    // 변경된 라우터 경로값 확인
    console.log("라우터경로:", pathname);
  }, [pathname]);
  // 의존성을 라우터 경로 변수로 설정한다!

  // 컴포넌트 리턴이 필요하나
  // 소스리턴이 아니므로 null를 쓴다
  return null;
}; /////////// ScrollTop 컴포넌트 ////////////

/// 컴포넌트 출력 ///
// 먼저 root 객체 만들기
const root = ReactDOM.createRoot(document.querySelector("#root"));
// 출력하기
root.render(<MainComponent />);
