import React from "react";
import { useLocation } from "react-router-dom";
import SubVid from "../modules/SubVid";
import SubPoint from "../modules/SubPoint";
import SubSets from "../modules/SubSets";
import SubColor from "../modules/SubColor";

function SubPage() {
  // 라우터호출 시 전달한 값을 받는다.

  return (
    <>
      <SubVid catName="OilColors" subCatName="shinhan" />

      <SubPoint catName="OilColors" subCatName="shinhan" />

      <SubSets catName="OilColors" subCatName="shinhan" />

      <SubColor/>
    </>
  );
}

export default SubPage;
