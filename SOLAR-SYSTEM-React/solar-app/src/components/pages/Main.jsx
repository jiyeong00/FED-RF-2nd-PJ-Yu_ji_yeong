import React from "react";
import MainBan from "../modules/MainBan.jsx";
// import SliderBan from "../modules/SliderBan.jsx";

//css불러오기
import "../../css/main.scss";



export default function Main() {

  // 코드리턴구역
  return (
    <>
      {/* <!-- 섹션1-태양계 배너 --> */}
      <div id="main-area">
        <div className="main-area inbox">
          <section className="section panel">
            {/* 메인배너 모듈 */}
            <MainBan />
          </section>

          {/* <!--섹션2. 슬라이더 배너영역 --> */}
          {/* 슬라이더 배너 모듈 */}
          {/* <SliderBan /> */}
        </div>
      </div>
    </>
  );
} ///////////////Main////////////////
