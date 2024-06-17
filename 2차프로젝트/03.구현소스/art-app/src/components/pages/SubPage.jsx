import React from "react";
import SubVid from "../modules/SubVid";
import { useLocation } from "react-router-dom";

function SubPage() {
  // 라우터호출 시 전달한 값을 받는다.

  return (
    <>
      <SubVid catName="OilColors" subCatName={"shinhan"}/>
    </>
  );
}

export default SubPage;
