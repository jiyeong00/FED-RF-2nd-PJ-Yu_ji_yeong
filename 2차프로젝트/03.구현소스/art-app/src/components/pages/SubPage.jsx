import React from "react";
import { useLocation } from "react-router-dom";
import SubVid from "../modules/SubVid";
import SubPoint from "../modules/SubPoint";
import SubSets from "../modules/SubSets";
import SubColor from "../modules/SubColor";

function SubPage() {
  // 라우터호출 시 전달한 값을 받는다.
  const loc = useLocation();
  const mcat = loc.state.mcat;
  const scat = loc.state.scat;
  console.log("요기:",mcat,scat);


  return (
    <>
      <SubVid catName={mcat} subCatName={scat} />

      <SubPoint catName={mcat} subCatName={scat} />

      <SubSets catName={mcat} subCatName={scat} />

      <SubColor/>
    </>
  );
}

export default SubPage;
