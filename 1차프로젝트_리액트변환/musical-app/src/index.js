import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// 전체 공통 CSS 불러오기
// import "./css/index.scss";

// 컴포넌트 불러오기
import Layout from "./components/layout/Layout";
import Main from "./components/pages/Main";
import Projects from "./components/pages/Projects";

export default function MainComponent() {
  return (
    // 라우터 루트로 라우터 구성시작
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <ScrollTop /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
