import React from "react";
import TopArea from "./TopArea";
import MainArea from "./MainArea";

function Layout(props) {
  return (
    <>
    {/* 상단 */}
    <TopArea/>
    {/* 메인 */}
    <MainArea/>
    </>
  );
}

export default Layout;
