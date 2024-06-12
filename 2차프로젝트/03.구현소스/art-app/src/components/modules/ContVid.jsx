// DC.com 배너 컴포넌트 ///////
import React from "react";

// 데이터 불러오기
import contData from "../data/cont_data";

// 배너 CSS
import "../../css/cont_vid.scss";

// function ContVid({ catName }) {
function ContVid({catName}) {
  // catName 배너 데이터 카테고리이름

  // 슬라이드 기능 생성자함수 인스턴스 생성하기
  // 선택 데이터
  // const selData = banData[catName];

  // 코드 리턴구역 /////////
  return (
    // <!-- 2-1. 컨텐츠 첫화면 -->
    <section className="cont1 cont-area">
      {/* <!-- 스크롤 하라는 애니 --> */}
      {/* <!-- 배경 비디오 --> */}
      <div className="visual-img-con">
        <div className="visual-video" data-type="video">
          <video muted="" loop="" autoplay="">
            <source
              src="https://www.shinhanart.com/video/Product/Oil Colors/OC_MAIN_KR_EN.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}

export default ContVid;