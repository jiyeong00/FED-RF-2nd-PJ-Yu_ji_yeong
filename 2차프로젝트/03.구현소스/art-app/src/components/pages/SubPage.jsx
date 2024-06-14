import React from "react";
import SubVid from "../modules/SubVid";
import { useLocation } from "react-router-dom";

function SubPage() {
  // 라우터호출 시 전달한 값을 받는다.

  return (
    <>
    <h1>서브페이지!</h1>
      {/* <SubVid catName="OilColors" /> */}
    </>
  );
}

export default SubPage;
