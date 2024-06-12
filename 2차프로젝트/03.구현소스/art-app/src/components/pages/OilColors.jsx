// 오일 페이지 컴포넌트 ///

import ContDesc from "../modules/ContDesc";
import ContVid from "../modules/ContVid";

// import Banner from "../modules/Banner";
// import VidIntro from "../modules/VidIntro";

export default function OilColors() {
  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1. 배너 컴포넌트
      <Banner catName="GAMES" />
      비디오소개 컴포넌트
      <VidIntro catName="GAMES" clsName="on" /> */}
      {/* 컨텐츠페이지 1번째 */}
      <ContVid catName="OilColors"/>

      {/* 컨텐츠페이지 2번째 */}
      <ContDesc catName="OilColors"/>
    </>
  );
} /////////// OilColors /////////////////////
