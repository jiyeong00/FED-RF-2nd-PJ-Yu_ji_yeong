import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 공통 CSS 불러오기
import "./css/index.scss";
// 컴포넌트 불러오기
import Main from "./components/pages/Main";
import OilColors from "./components/pages/OilColors";
import KoreanColors from "./components/pages/KoreanColors";
import PaintColors from "./components/pages/PaintColors";
import PosterColors from "./components/pages/PosterColors";

export default function MainComponent() {
  return (
    // 라우터 루트로 라우터 구성시작
    <BrowserRouter>
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
          <Route path="Korean Colors" element={<KoreanColors />} />
          <Route path="Paint Colors" element={<PaintColors />} />
          <Route path="Poster Colors" element={<PosterColors />} />
          {/* <Route path="comics" element={<Comics />} /> */}
        </Route>
        {/* Layout 루트 Route로 하위 Route를 감싼다! */}
      </Routes>
    </BrowserRouter>
  );
}

/// 컴포넌트 출력 ///
// 먼저 root 객체 만들기
const root = ReactDOM.createRoot(document.querySelector("#root"));
// 출력하기
root.render(<MainComponent />);
